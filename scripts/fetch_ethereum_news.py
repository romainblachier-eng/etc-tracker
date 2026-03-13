#!/usr/bin/env python3
"""
ETC Tracker — Module d'actualités Ethereum Classic
===================================================
Récupère les dernières actualités ETC via NewsAPI,
reformule chaque article avec Claude AI, et crée une page de news.

Variables d'environnement :
  ANTHROPIC_API_KEY      Clé API Anthropic (Secret GitHub)
  NEWSAPI_API_KEY        Clé API NewsAPI   (Secret GitHub)
"""

import os
import sys
import json
import requests
from datetime import datetime
from typing import Optional


# ──────────────────────────────────────────────
# 1. Récupération des actualités NewsAPI
# ──────────────────────────────────────────────

def fetch_ethereum_news(api_key: str, max_articles: int = 5) -> list:
    """Récupère les actualités Ethereum Classic depuis NewsAPI."""
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "\"Ethereum Classic\"",
        "sortBy": "publishedAt",
        "language": "en",
        "pageSize": max_articles,
    }
    headers = {"Authorization": api_key}

    try:
        resp = requests.get(url, params=params, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()

        if data.get("status") != "ok":
            error_msg = data.get("message", "Erreur inconnue")
            print(f"⚠️  NewsAPI : {error_msg}")
            return []

        articles = data.get("articles", [])
        return articles[:max_articles]

    except requests.exceptions.HTTPError as exc:
        print(f"❌ Erreur HTTP NewsAPI ({exc.response.status_code}) : {exc}")
        return []
    except Exception as exc:
        print(f"❌ Erreur lors de la récupération des news : {exc}")
        return []


# ──────────────────────────────────────────────
# 2. Reformulation avec Claude
# ──────────────────────────────────────────────

def reformulate_article(title: str, description: str, api_key: str) -> Optional[str]:
    """Reformule un article d'actualité avec Claude (résumé court et clair)."""
    import anthropic

    client = anthropic.Anthropic(api_key=api_key)
    prompt = (
        "Tu es un spécialiste des cryptomonnaies. "
        "Reformule cet article d'actualité en français en 2-3 phrases claires et précises. "
        "Concentre-toi sur l'essentiel. "
        "Ne commence pas par 'Cet article...' ou 'L\'actualité...'.\n\n"
        f"Titre : {title}\n"
        f"Contenu : {description}"
    )

    try:
        message = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            messages=[{"role": "user", "content": prompt}],
        )
        return message.content[0].text.strip()
    except Exception as exc:
        print(f"⚠️  Erreur Claude pour '{title[:50]}' : {exc}")
        return None


# ──────────────────────────────────────────────
# 3. Création de la page des actualités
# ──────────────────────────────────────────────

def create_news_markdown(articles: list, reformulated: dict) -> str:
    """Génère une page Markdown avec les actualités reformulées."""
    now = datetime.now()

    # Frontmatter
    frontmatter = (
        f'---\n'
        f'title: "Actualités ETC du {now.strftime("%Y-%m-%d")}"\n'
        f'date: {now.strftime("%Y-%m-%dT%H:%M:%S")}+01:00\n'
        f'draft: false\n'
        f'description: "Dernières actualités Ethereum Classic reformulées par IA"\n'
        f'---\n\n'
    )

    # Corps
    body = "## Actualités Ethereum Classic 📰\n\n"

    for idx, article in enumerate(articles, 1):
        title = article.get("title", "Sans titre")
        url = article.get("url", "#")
        source = article.get("source", {}).get("name", "Source")
        pubdate = article.get("publishedAt", "")[:10]

        # Récupère la version reformulée ou l'original
        refor = reformulated.get(title, article.get("description", "Pas de description disponible"))

        body += (
            f"### {idx}. {title}\n\n"
            f"**Source :** {source} ({pubdate})\n\n"
            f"{refor}\n\n"
            f"[Lire l'article complet →]({url})\n\n"
            f"---\n\n"
        )

    # Footer
    footer = (
        "*Actualités récupérées via [NewsAPI](https://newsapi.org). "
        "Résumés reformulés par Claude AI (Anthropic). "
        "Ce contenu est fourni à titre informatif uniquement.*\n"
    )

    return frontmatter + body + footer


def save_news_article(markdown: str) -> str:
    """Enregistre la page des actualités dans content/pages/."""
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")

    filepath = os.path.join("content", "pages", "ethereum-news.md")
    os.makedirs(os.path.join("content", "pages"), exist_ok=True)

    with open(filepath, "w", encoding="utf-8") as fh:
        fh.write(markdown)

    print(f"✅ Page d'actualités créée : {filepath}")
    return filepath


# ──────────────────────────────────────────────
# 4. Point d'entrée
# ──────────────────────────────────────────────

def main() -> None:
    print("═══════════════════════════════════════")
    print("  ETC Tracker — Module d'actualités    ")
    print("═══════════════════════════════════════")

    # 4-a. Clés API
    newsapi_key = os.environ.get("NEWSAPI_API_KEY", "").strip()
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()

    if not newsapi_key:
        print("❌ Variable NEWSAPI_API_KEY manquante — module d'actualités désactivé.")
        return

    if not anthropic_key:
        print("⚠️  Variable ANTHROPIC_API_KEY manquante — utilisation des résumés originaux.")

    # 4-b. Récupération des actualités
    print("\n📰 Récupération des actualités ETC (NewsAPI)…")
    articles = fetch_ethereum_news(newsapi_key, max_articles=5)

    if not articles:
        print("❌ Aucune actualité trouvée — module d'actualités désactivé.")
        return

    print(f"   {len(articles)} actualité(s) trouvée(s)")

    # 4-c. Reformulation avec Claude
    reformulated = {}
    if anthropic_key:
        print("\n🤖 Reformulation des actualités (Claude)…")
        for article in articles:
            title = article.get("title", "")
            description = article.get("description", "")

            if title and description:
                refor = reformulate_article(title, description, anthropic_key)
                if refor:
                    reformulated[title] = refor
                    print(f"   ✓ {title[:60]}…")

    # 4-d. Création de la page
    print("\n📝 Création de la page d'actualités…")
    markdown = create_news_markdown(articles, reformulated)
    save_news_article(markdown)

    print("\nTerminé ✓")


if __name__ == "__main__":
    main()
