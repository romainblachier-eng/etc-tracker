#!/usr/bin/env python3
"""
ETC Tracker — Script de génération d'article quotidien
======================================================
Récupère le cours de l'Ethereum Classic (ETC) via l'API CoinGecko,
génère une analyse avec Claude (Anthropic), publie sur Hugo ET sur Beehiiv.

Variables d'environnement :
  ANTHROPIC_API_KEY      Clé API Anthropic (Secret GitHub)
  BEEHIIV_API_KEY        Clé API Beehiiv   (Secret GitHub)
  BEEHIIV_PUBLICATION_ID ID de la publication Beehiiv (Secret GitHub)
"""

import os
import sys
import time
import requests
from datetime import datetime


# ──────────────────────────────────────────────
# 1. Récupération des données CoinGecko
# ──────────────────────────────────────────────

def fetch_etc_data() -> dict:
    """Récupère les données de marché ETC depuis l'API publique CoinGecko."""
    url = "https://api.coingecko.com/api/v3/coins/ethereum-classic"
    params = {
        "localization":    "false",
        "tickers":         "false",
        "market_data":     "true",
        "community_data":  "false",
        "developer_data":  "false",
        "sparkline":       "false",
    }
    headers = {"Accept": "application/json"}

    for attempt in range(3):
        try:
            resp = requests.get(url, params=params, headers=headers, timeout=30)
            resp.raise_for_status()
            data = resp.json()
            md   = data["market_data"]
            return {
                "price_usd":          md["current_price"]["usd"],
                "price_eur":          md["current_price"]["eur"],
                "change_24h":         md.get("price_change_percentage_24h")  or 0.0,
                "change_7d":          md.get("price_change_percentage_7d")   or 0.0,
                "change_30d":         md.get("price_change_percentage_30d")  or 0.0,
                "market_cap_usd":     md["market_cap"]["usd"],
                "volume_24h_usd":     md["total_volume"]["usd"],
                "ath_usd":            md["ath"]["usd"],
                "ath_date":           md["ath_date"]["usd"][:10],
                "circulating_supply": md.get("circulating_supply") or 0,
                "max_supply":         md.get("max_supply") or 210_700_000,
            }
        except requests.exceptions.HTTPError as exc:
            if resp.status_code == 429:
                wait = 60 * (attempt + 1)
                print(f"⏳ Rate limit CoinGecko — attente {wait}s…")
                time.sleep(wait)
            else:
                raise
        except Exception as exc:
            if attempt < 2:
                print(f"⚠️  Tentative {attempt + 1} échouée : {exc} — nouvel essai dans 10s…")
                time.sleep(10)
            else:
                raise

    raise RuntimeError("Impossible de récupérer les données CoinGecko après 3 tentatives.")


# ──────────────────────────────────────────────
# 2. Analyse avec Claude (Anthropic)
# ──────────────────────────────────────────────

def generate_ai_analysis(etc_data: dict, api_key: str) -> str:
    """Génère une analyse de marché avec Claude Haiku (Anthropic)."""
    import anthropic

    client = anthropic.Anthropic(api_key=api_key)
    prompt = (
        "Tu es un analyste de marché spécialisé dans les cryptomonnaies. "
        "Rédige en français un commentaire de marché factuel et nuancé (150–200 mots) "
        "sur l'Ethereum Classic (ETC) à partir des données ci-dessous. "
        "N'émets aucune recommandation d'investissement. "
        "Ne commence pas ta réponse par 'L'Ethereum Classic'.\n\n"
        f"Prix          : {etc_data['price_usd']:.4f} USD  /  {etc_data['price_eur']:.4f} EUR\n"
        f"Variation 24h : {etc_data['change_24h']:+.2f}%\n"
        f"Variation 7j  : {etc_data['change_7d']:+.2f}%\n"
        f"Variation 30j : {etc_data['change_30d']:+.2f}%\n"
        f"Capitalisation: {etc_data['market_cap_usd']:,.0f} USD\n"
        f"Volume 24h    : {etc_data['volume_24h_usd']:,.0f} USD\n"
        f"ATH           : {etc_data['ath_usd']:.2f} USD (le {etc_data['ath_date']})"
    )

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=450,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text.strip()


# ──────────────────────────────────────────────
# 3. Analyse de secours (sans IA)
# ──────────────────────────────────────────────

def generate_basic_analysis(etc_data: dict) -> str:
    """Génère une analyse basique sans appel API."""
    c = etc_data["change_24h"]
    if   c >  5: trend, note = "forte hausse",     "Le momentum haussier est marqué sur la séance."
    elif c >  2: trend, note = "hausse",            "Les acheteurs gardent l'avantage."
    elif c >  0: trend, note = "légère progression","Le cours avance prudemment en territoire positif."
    elif c > -2: trend, note = "légère correction", "La pression vendeuse reste contenue."
    elif c > -5: trend, note = "baisse",            "Les vendeurs prennent le dessus sur la séance."
    else:        trend, note = "forte baisse",      "La pression vendeuse est significative."

    ath_pct   = ((etc_data["price_usd"] / etc_data["ath_usd"]) - 1) * 100
    direction = "en dessous de" if ath_pct < 0 else "au-dessus de"

    vol_str = (f"{etc_data['volume_24h_usd']/1e9:.2f} Mrd USD"
               if etc_data['volume_24h_usd'] >= 1e9
               else f"{etc_data['volume_24h_usd']/1e6:.2f} M USD")
    cap_str = (f"{etc_data['market_cap_usd']/1e9:.2f} Mrd USD"
               if etc_data['market_cap_usd'] >= 1e9
               else f"{etc_data['market_cap_usd']/1e6:.2f} M USD")

    return (
        f"L'ETC affiche une {trend} de {c:+.2f}% sur les dernières 24 heures. "
        f"{note}\n\n"
        f"Sur une semaine glissante, la performance s'établit à {etc_data['change_7d']:+.2f}%, "
        f"et à {etc_data['change_30d']:+.2f}% sur le dernier mois. "
        f"Le volume journalier atteint {vol_str} pour une capitalisation de {cap_str}.\n\n"
        f"Le cours se situe actuellement à {abs(ath_pct):.1f}% "
        f"{direction} son sommet historique de {etc_data['ath_usd']:.2f} USD "
        f"(atteint le {etc_data['ath_date']})."
    )


# ──────────────────────────────────────────────
# 4. Création de l'article Hugo (Markdown)
# ──────────────────────────────────────────────

def fmt_big(n: float) -> str:
    """Formate un grand nombre en Mrd/M USD."""
    if n >= 1_000_000_000:
        return f"{n / 1_000_000_000:.2f} Mrd USD"
    if n >= 1_000_000:
        return f"{n / 1_000_000:.2f} M USD"
    return f"{n:,.0f} USD"


def create_hugo_article(etc_data: dict, analysis: str) -> str:
    """Génère le fichier Markdown dans content/posts/ et retourne son chemin."""
    now      = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    slug     = f"etc-{date_str}"
    filepath = os.path.join("content", "posts", f"{slug}.md")

    # Évite les doublons si le workflow tourne deux fois dans la journée
    if os.path.exists(filepath):
        print(f"ℹ️  Article du jour déjà existant ({filepath}) — ignoré.")
        return filepath

    sign  = "+" if etc_data["change_24h"] >= 0 else ""
    emoji = "📈" if etc_data["change_24h"] >= 0 else "📉"

    # Jour sans zéro initial (Linux : %-d)
    try:
        day_fmt = now.strftime("%-d %B %Y")
    except ValueError:
        day_fmt = now.strftime("%d %B %Y").lstrip("0")

    frontmatter = (
        f'---\n'
        f'title: "ETC {date_str} — {etc_data["price_usd"]:.4f} $ ({sign}{etc_data["change_24h"]:.2f}%)"\n'
        f'date: {now.strftime("%Y-%m-%dT%H:%M:%S")}+01:00\n'
        f'draft: false\n'
        f'description: "Cours Ethereum Classic du {date_str} : '
        f'{etc_data["price_usd"]:.4f} USD, variation 24h {sign}{etc_data["change_24h"]:.2f}%"\n'
        f'---\n\n'
    )

    body = (
        f"## Cours du {day_fmt} {emoji}\n\n"
        f"| Indicateur | Valeur |\n"
        f"|---|---|\n"
        f"| **Prix USD** | {etc_data['price_usd']:.4f} $ |\n"
        f"| **Prix EUR** | {etc_data['price_eur']:.4f} € |\n"
        f"| **Variation 24h** | {sign}{etc_data['change_24h']:.2f}% |\n"
        f"| **Variation 7 jours** | {etc_data['change_7d']:+.2f}% |\n"
        f"| **Variation 30 jours** | {etc_data['change_30d']:+.2f}% |\n"
        f"| **Capitalisation** | {fmt_big(etc_data['market_cap_usd'])} |\n"
        f"| **Volume 24h** | {fmt_big(etc_data['volume_24h_usd'])} |\n"
        f"| **Plus haut historique** | {etc_data['ath_usd']:.2f} $ |\n\n"
        f"## Analyse du jour\n\n"
        f"{analysis}\n\n"
        f"---\n\n"
        f"*Données : [CoinGecko](https://www.coingecko.com) (API publique). "
        f"Analyse générée automatiquement par Claude AI (Anthropic). "
        f"Ce site est fourni à titre informatif uniquement — pas de conseil en investissement.*\n"
    )

    os.makedirs(os.path.join("content", "posts"), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as fh:
        fh.write(frontmatter + body)

    print(f"✅ Article créé : {filepath}")
    return filepath


# ──────────────────────────────────────────────
# 5. Publication sur Beehiiv
# ──────────────────────────────────────────────

def publish_to_beehiiv(etc_data: dict, analysis: str, api_key: str, pub_id: str) -> None:
    """Publie l'article du jour sur Beehiiv via l'API REST."""
    now      = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    sign     = "+" if etc_data["change_24h"] >= 0 else ""
    emoji    = "📈" if etc_data["change_24h"] >= 0 else "📉"

    try:
        day_fmt = now.strftime("%-d %B %Y")
    except ValueError:
        day_fmt = now.strftime("%d %B %Y").lstrip("0")

    title = (
        f"ETC {date_str} — {etc_data['price_usd']:.4f} $ "
        f"({sign}{etc_data['change_24h']:.2f}%) {emoji}"
    )
    subtitle = (
        f"Cours Ethereum Classic du {date_str} : "
        f"{etc_data['price_usd']:.4f} USD, variation 24h {sign}{etc_data['change_24h']:.2f}%"
    )

    # Analyse : remplace les sauts de ligne en balises <p>
    analysis_html = "".join(
        f"<p>{para.strip()}</p>"
        for para in analysis.split("\n\n")
        if para.strip()
    )

    content_html = f"""
<h2>Cours du {day_fmt} {emoji}</h2>
<table>
  <thead><tr><th>Indicateur</th><th>Valeur</th></tr></thead>
  <tbody>
    <tr><td><strong>Prix USD</strong></td><td>{etc_data['price_usd']:.4f} $</td></tr>
    <tr><td><strong>Prix EUR</strong></td><td>{etc_data['price_eur']:.4f} €</td></tr>
    <tr><td><strong>Variation 24h</strong></td><td>{sign}{etc_data['change_24h']:.2f}%</td></tr>
    <tr><td><strong>Variation 7 jours</strong></td><td>{etc_data['change_7d']:+.2f}%</td></tr>
    <tr><td><strong>Variation 30 jours</strong></td><td>{etc_data['change_30d']:+.2f}%</td></tr>
    <tr><td><strong>Capitalisation</strong></td><td>{fmt_big(etc_data['market_cap_usd'])}</td></tr>
    <tr><td><strong>Volume 24h</strong></td><td>{fmt_big(etc_data['volume_24h_usd'])}</td></tr>
    <tr><td><strong>Plus haut historique</strong></td><td>{etc_data['ath_usd']:.2f} $</td></tr>
  </tbody>
</table>

<h2>Analyse du jour</h2>
{analysis_html}

<hr>
<p><em>Données : <a href="https://www.coingecko.com">CoinGecko</a> (API publique).
Analyse générée automatiquement par Claude AI (Anthropic).
Ce contenu est fourni à titre informatif uniquement — pas de conseil en investissement.</em></p>
"""

    url     = f"https://api.beehiiv.com/v2/publications/{pub_id}/posts"
    headers = {
        "Content-Type":  "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    payload = {
        "title":           title,
        "subtitle":        subtitle,
        "content_html":    content_html,
        "status":          "confirmed",   # publié immédiatement
        "send_at":         None,          # envoi immédiat
    }

    resp = requests.post(url, json=payload, headers=headers, timeout=30)

    if resp.status_code in (200, 201):
        data = resp.json().get("data", {})
        post_id  = data.get("id", "—")
        web_url  = data.get("web_url") or data.get("url") or "—"
        print(f"✅ Beehiiv — Article publié (id={post_id})")
        print(f"   URL : {web_url}")
    else:
        print(f"⚠️  Beehiiv — Erreur {resp.status_code} : {resp.text[:300]}")


# ──────────────────────────────────────────────
# 6. Point d'entrée
# ──────────────────────────────────────────────

def main() -> None:
    print("═══════════════════════════════════════")
    print("  ETC Tracker — Génération quotidienne ")
    print("═══════════════════════════════════════")

    # 6-a. Données de marché
    print("\n📡 Récupération des données CoinGecko…")
    etc_data = fetch_etc_data()
    print(
        f"   Prix : {etc_data['price_usd']:.4f} USD  |  "
        f"Variation 24h : {etc_data['change_24h']:+.2f}%"
    )

    # 6-b. Analyse
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if api_key:
        print("\n🤖 Génération de l'analyse IA (Claude)…")
        try:
            analysis = generate_ai_analysis(etc_data, api_key)
            print("   Analyse générée avec succès.")
        except Exception as exc:
            print(f"   ⚠️  Erreur API Anthropic ({exc}) — utilisation de l'analyse basique.")
            analysis = generate_basic_analysis(etc_data)
    else:
        print("\n⚠️  Variable ANTHROPIC_API_KEY absente — analyse basique utilisée.")
        analysis = generate_basic_analysis(etc_data)

    # 6-c. Création de l'article Hugo
    print("\n📝 Création de l'article Hugo…")
    create_hugo_article(etc_data, analysis)

    # 6-d. Publication Beehiiv (optionnelle)
    beehiiv_key = os.environ.get("BEEHIIV_API_KEY", "").strip()
    beehiiv_pub = os.environ.get("BEEHIIV_PUBLICATION_ID", "").strip()
    if beehiiv_key and beehiiv_pub:
        print("\n🐝 Publication sur Beehiiv…")
        try:
            publish_to_beehiiv(etc_data, analysis, beehiiv_key, beehiiv_pub)
        except Exception as exc:
            print(f"   ⚠️  Erreur Beehiiv ({exc}) — publication ignorée.")
    else:
        print("\n⚠️  Variables Beehiiv absentes — publication Beehiiv ignorée.")

    print("\nTerminé ✓")


if __name__ == "__main__":
    main()
