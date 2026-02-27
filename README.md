# ETC Tracker

Site de suivi automatisé du cours de l'**Ethereum Classic (ETC)**.

Chaque matin à **9h00** (heure de Paris), un workflow GitHub Actions :
1. Récupère le cours ETC via l'API CoinGecko
2. Génère une analyse avec **Claude AI** (Anthropic)
3. Publie un article sur le site via **GitHub Pages**

---

## Installation rapide

Suivre le guide fourni (`guide-etc-tracker.pdf`).

**Étapes résumées :**
1. Créer un dépôt GitHub public
2. Pousser ce projet
3. Ajouter le Secret `ANTHROPIC_API_KEY` dans GitHub Settings → Secrets
4. Activer GitHub Pages (source : branche `gh-pages`)
5. Mettre à jour `baseURL` dans `hugo.toml`

---

## Structure du projet

```
etc-site/
├── .github/workflows/daily-update.yml   ← Workflow GitHub Actions
├── content/posts/                        ← Articles générés automatiquement
├── layouts/                              ← Templates Hugo
│   ├── _default/baseof.html
│   ├── _default/single.html
│   ├── _default/list.html
│   └── index.html
├── static/css/style.css                  ← Styles du site
├── scripts/generate_article.py          ← Script de génération
└── hugo.toml                             ← Configuration Hugo
```

---

## Personnalisation

- **Fréquence** : modifier le `cron` dans `.github/workflows/daily-update.yml`
- **Modèle IA** : changer `model` dans `scripts/generate_article.py`
- **Style** : éditer `static/css/style.css`
- **URL du site** : mettre à jour `baseURL` dans `hugo.toml`

---

*Ce projet est fourni à titre éducatif. Il ne constitue pas un conseil en investissement.*
