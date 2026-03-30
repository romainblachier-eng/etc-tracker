#!/usr/bin/env python3
"""
ETC Tracker — Génération d'illustration via Higgsfield AI
==========================================================
Génère une image illustrative pour l'article ETC du jour
en utilisant l'API Higgsfield Cloud (higgsfield-client).

Variables d'environnement :
  HF_KEY                Clé API Higgsfield (format "api_key:api_secret")
  — ou bien —
  HF_API_KEY            Clé API Higgsfield
  HF_API_SECRET         Secret API Higgsfield
"""

import os
import sys
import json
import requests
from datetime import datetime

try:
    from higgsfield_client import HiggsFieldClient
except ImportError:
    print("⚠️  Module higgsfield-client non installé — pip install higgsfield-client")
    sys.exit(0)  # Non bloquant : on ne casse pas le workflow


# ──────────────────────────────────────────────
# 1. Configuration
# ──────────────────────────────────────────────

# Modèle text-to-image par défaut
DEFAULT_MODEL = "bytedance/seedream/v4/text-to-image"

# Dossier de destination des images
IMAGES_DIR = os.path.join("static", "images", "illustrations")


def has_credentials() -> bool:
    """Vérifie que les credentials Higgsfield sont disponibles."""
    if os.environ.get("HF_KEY", "").strip():
        return True
    if (os.environ.get("HF_API_KEY", "").strip()
            and os.environ.get("HF_API_SECRET", "").strip()):
        return True
    return False


# ──────────────────────────────────────────────
# 2. Génération du prompt
# ──────────────────────────────────────────────

def build_prompt(etc_data: dict) -> str:
    """Construit un prompt de génération d'image adapté au marché du jour."""
    change = etc_data.get("change_24h", 0)

    if change > 5:
        mood = "vibrant green upward arrows, bullish energy, bright golden light"
        atmosphere = "optimistic and dynamic"
    elif change > 0:
        mood = "subtle green tones, gentle upward trend, calm positive energy"
        atmosphere = "steady and hopeful"
    elif change > -5:
        mood = "muted red and orange tones, slight downward motion, cautious mood"
        atmosphere = "contemplative and measured"
    else:
        mood = "deep red tones, strong downward movement, stormy atmosphere"
        atmosphere = "dramatic and intense"

    return (
        f"Abstract digital art representing cryptocurrency market dynamics. "
        f"Ethereum Classic (ETC) blockchain visualization with {mood}. "
        f"Futuristic financial data streams, circuit board patterns, "
        f"and holographic price charts in a {atmosphere} composition. "
        f"Dark background with glowing neon accents. "
        f"Professional, clean, modern fintech aesthetic. "
        f"No text, no logos, no words."
    )


# ──────────────────────────────────────────────
# 3. Génération et téléchargement de l'image
# ──────────────────────────────────────────────

def generate_image(prompt: str, output_path: str) -> str:
    """Génère une image via Higgsfield et la sauvegarde localement."""
    client = HiggsFieldClient()

    print(f"   Prompt : {prompt[:80]}…")
    print(f"   Modèle : {DEFAULT_MODEL}")

    # Soumission bloquante — attend le résultat
    result = client.subscribe(
        model=DEFAULT_MODEL,
        params={
            "prompt": prompt,
            "resolution": "1024x576",  # Format 16:9 paysage
            "num_images": 1,
        },
    )

    # Récupérer l'URL de l'image depuis le résultat
    image_url = None
    if isinstance(result, dict):
        # Formats possibles de la réponse
        image_url = (
            result.get("image_url")
            or result.get("url")
            or result.get("output", [None])[0]
        )
        if isinstance(result.get("output"), list) and result["output"]:
            image_url = image_url or result["output"][0]
    elif isinstance(result, list) and result:
        image_url = result[0] if isinstance(result[0], str) else None

    if not image_url:
        raise ValueError(f"Impossible d'extraire l'URL de l'image du résultat : {result}")

    # Télécharger l'image
    print(f"   Téléchargement de l'image…")
    resp = requests.get(image_url, timeout=60)
    resp.raise_for_status()

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(resp.content)

    print(f"   Image sauvegardée : {output_path}")
    return output_path


# ──────────────────────────────────────────────
# 4. Mise à jour de l'article Hugo
# ──────────────────────────────────────────────

def update_article_frontmatter(article_path: str, image_rel_path: str) -> None:
    """Ajoute le champ 'image' au frontmatter de l'article."""
    if not os.path.exists(article_path):
        print(f"   ⚠️  Article introuvable : {article_path}")
        return

    with open(article_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Insérer 'image:' avant la fin du frontmatter (---)
    if "image:" not in content:
        # Trouver le second '---'
        first = content.index("---")
        second = content.index("---", first + 3)
        content = (
            content[:second]
            + f'image: "/{image_rel_path}"\n'
            + content[second:]
        )

        with open(article_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"   Frontmatter mis à jour avec l'image.")


# ──────────────────────────────────────────────
# 5. Point d'entrée
# ──────────────────────────────────────────────

def main() -> None:
    print("\n🎨 Higgsfield AI — Génération d'illustration")
    print("─" * 45)

    # Vérification des credentials
    if not has_credentials():
        print("⚠️  Credentials Higgsfield absents (HF_KEY ou HF_API_KEY/HF_API_SECRET).")
        print("   Étape ignorée — aucune illustration générée.")
        return

    # Lire les données ETC depuis l'article du jour
    date_str = datetime.now().strftime("%Y-%m-%d")
    article_path = os.path.join("content", "posts", f"etc-{date_str}.md")

    if not os.path.exists(article_path):
        print(f"⚠️  Article du jour introuvable ({article_path}) — étape ignorée.")
        return

    # Extraire les données du frontmatter
    etc_data = {}
    with open(article_path, "r", encoding="utf-8") as f:
        in_frontmatter = False
        for line in f:
            if line.strip() == "---":
                if in_frontmatter:
                    break
                in_frontmatter = True
                continue
            if in_frontmatter and ":" in line:
                key, _, val = line.partition(":")
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key in ("price_usd", "price_eur", "change_24h", "change_7d", "change_30d"):
                    try:
                        etc_data[key] = float(val)
                    except ValueError:
                        pass

    if "change_24h" not in etc_data:
        print("⚠️  Données de marché introuvables dans l'article — prompt générique utilisé.")
        etc_data["change_24h"] = 0

    # Générer le prompt
    prompt = build_prompt(etc_data)

    # Générer l'image
    image_filename = f"etc-{date_str}.png"
    image_path = os.path.join(IMAGES_DIR, image_filename)
    image_rel_path = f"images/illustrations/{image_filename}"

    try:
        generate_image(prompt, image_path)
        # Mettre à jour le frontmatter de l'article
        update_article_frontmatter(article_path, image_rel_path)
        print("✅ Illustration générée avec succès.")
    except Exception as exc:
        print(f"⚠️  Erreur Higgsfield ({exc}) — illustration ignorée.")
        # Non bloquant : le workflow continue sans image


if __name__ == "__main__":
    main()
