# Configuration du module d'actualités Ethereum Classic

Ce guide vous aide à configurer le module d'actualités avec **NewsAPI**.

---

## 1️⃣ Obtenir une clé NewsAPI

1. Allez sur [https://newsapi.org/register](https://newsapi.org/register)
2. Créez un compte (gratuit)
3. Confirmez votre email
4. Allez dans **"API Keys"** et copiez votre **clé API** (commence par `xxxxxxxx`)

> **Plan gratuit NewsAPI :**
> - 100 requêtes par jour
> - Parfait pour une mise à jour quotidienne

---

## 2️⃣ Ajouter la clé dans GitHub Secrets

### Sur GitHub :
1. Allez dans votre dépôt
2. **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **"New repository secret"**
4. **Name :** `NEWSAPI_API_KEY`
5. **Value :** (collez votre clé NewsAPI)
6. Cliquez sur **"Add secret"**

---

## 3️⃣ Vérifier la configuration

### Variables attendues dans GitHub Secrets :
- ✅ `ANTHROPIC_API_KEY` (existant)
- ✅ `NEWSAPI_API_KEY` (nouveau)
- ✅ `BEEHIIV_API_KEY` (optionnel)
- ✅ `BEEHIIV_PUBLICATION_ID` (optionnel)

---

## 4️⃣ Tester manuellement

Pour tester le script localement :

```bash
export ANTHROPIC_API_KEY="votre-clé-anthropic"
export NEWSAPI_API_KEY="votre-clé-newsapi"

python scripts/fetch_ethereum_news.py
```

Cela créera/modifiera le fichier : `content/pages/ethereum-news.md`

---

## 📰 Contenu généré

Le module crée une page `ethereum-news.md` contenant :

- **Titre :** "Actualités ETC du [DATE]"
- **Format :** 3-5 articles réformulés
- **Pour chaque article :**
  - Titre original
  - Source et date
  - Résumé reformulé par Claude (2-3 phrases claires)
  - Lien vers l'article complet

---

## 🔄 Fréquence de mise à jour

Le module s'exécute automatiquement :
- **Tous les jours à 9h00** (heure de Paris) via GitHub Actions
- À chaque déclenchement manuel du workflow

---

## ⚙️ Personnalisation

### Modifier le nombre d'articles

Dans `scripts/fetch_ethereum_news.py`, ligne ~60 :
```python
articles = fetch_ethereum_news(newsapi_key, max_articles=5)  # Changez 5
```

### Modifier la langue des articles

Ligne ~46 :
```python
"language": "en",  # Changez en "fr" pour français, "de" pour allemand, etc.
```

### Modifier la requête de recherche

Ligne ~44 :
```python
"q": "Ethereum Classic OR ETC",  # Modifiez selon votre besoin
```

---

## 🐛 Dépannage

### ❌ "Aucune actualité trouvée"
- Vérifiez que `NEWSAPI_API_KEY` est correcte dans GitHub Secrets
- Vérifiez les limites de votre plan NewsAPI

### ❌ "ANTHROPIC_API_KEY manquante"
- Ce n'est pas critique — le module fonctionnera sans reformulation IA
- Les résumés originaux de NewsAPI seront utilisés

### ❌ Le fichier `ethereum-news.md` ne s'affiche pas
- Assurez-vous que votre `hugo.toml` inclut la section des pages
- Hugo par défaut affiche les pages dans `/pages/`

---

## 📚 Ressources

- [NewsAPI Documentation](https://newsapi.org/docs)
- [Hugo Pages](https://gohugo.io/content-management/sections/)
- [Claude API](https://docs.anthropic.com)

---

*Module développé pour ETC Tracker. Mise à jour : 2026-03-01*
