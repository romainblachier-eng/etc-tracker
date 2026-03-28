# Mounjaro Magazine - WordPress Theme

Un thème WordPress moderne et professionnel pour les blogs et magazines d'actualités. Conçu pour offrir une excellente expérience utilisateur avec un design élégant et des fonctionnalités avancées.

## Caractéristiques

✨ **Design Moderne**
- Interface épurée et professionnelle
- Gradient élégant dans le header
- Design responsive (mobile-first)
- Animations fluides et transitions

📰 **Fonctionnalités Magazine**
- Section articles en vedette
- Grille de cartes pour les articles
- Articles recommandés/connexes
- Métadonnées complètes (date, auteur, temps de lecture)
- Support des catégories et tags

🎨 **Personnalisation**
- Customizer WordPress intégré
- Couleurs personnalisables
- Logo personnalisé supporté
- Menus multiples
- Zones de widgets flexibles

📱 **Responsive Design**
- Adapté à tous les écrans (mobiles, tablettes, desktop)
- Menu mobile avec toggle
- Images optimisées
- Layout fluide

🔍 **SEO Optimisé**
- Structure HTML sémantique
- Support des breadcrumbs
- Métadonnées structurées
- Optimisé pour les moteurs de recherche

💬 **Commentaires**
- Système de commentaires intégré
- Formulaire de commentaire personnalisé
- Modération supportée

🚀 **Performance**
- Code CSS optimisé
- JavaScript modulaire
- Lazy loading des images
- Support des image sizes WordPress

## Installation

1. Téléchargez le thème dans `/wp-content/themes/mounjaro-magazine`
2. Allez à Apparence > Thèmes dans l'admin WordPress
3. Cliquez sur "Activer" pour Mounjaro Magazine
4. Personnalisez le thème via Apparence > Personnaliser

## Configuration Recommandée

### Plugins Recommandés
- **Yoast SEO** : Optimisation SEO
- **Contact Form 7** : Formulaires
- **Jetpack** : Statistiques et sécurité
- **WP Super Cache** : Cache et performance

### Paramètres WordPress
1. Allez à Paramètres > Lecture
2. Configurez le nombre d'articles par page
3. Configurez la page d'accueil si souhaité

### Menus
1. Allez à Apparence > Menus
2. Créez un menu principal
3. Assignez-le comme "Menu principal" sous "Paramètres du menu"

### Widgets
1. Allez à Apparence > Widgets
2. Configurez les zones latérales et footer selon vos besoins

## Personnalisation

### Couleurs

Via Apparence > Personnaliser > Couleurs du thème :
- **Couleur Primaire** : Utilisée pour les boutons et accents (défaut: #667eea)
- **Couleur Secondaire** : Utilisée pour les survolements (défaut: #764ba2)

### Logo

Via Apparence > Personnaliser > Identité du site :
1. Cliquez sur "Sélectionner le logo"
2. Téléchargez votre logo
3. Ajustez les dimensions (recommandé: 100x100px)

### Articles en Vedette

Pour marquer un article comme "en vedette" :
1. Éditez l'article
2. Dans le panneau latéral, cherchez la métadonnée "_is_featured"
3. Mettez-la à "1" pour ajouter à la section vedette

## Fichiers Importants

```
mounjaro-magazine/
├── style.css              # Styles du thème
├── functions.php          # Fonctionnalités et hooks
├── header.php             # Header du site
├── footer.php             # Footer du site
├── index.php              # Template par défaut
├── single.php             # Template pour articles individuels
├── page.php               # Template pour pages
├── 404.php                # Template page 404
├── comments.php           # Template commentaires
├── searchform.php         # Formulaire de recherche
├── inc/
│   ├── customizer.php     # Configuration du customizer
│   └── template-tags.php  # Tags de template personnalisés
└── assets/
    └── js/
        ├── main.js        # Scripts principaux
        └── customizer-preview.js
```

## Support et Documentation

Pour les questions ou les problèmes, visitez :
- [WordPress.org Theme Support](https://wordpress.org/support/)
- [Documentation WordPress](https://developer.wordpress.org/)

## Licence

Ce thème est licencié sous GPL v2 ou ultérieur.

## Crédits

Conçu par **Romain Blachier**

---

**Version:** 1.0.0
**Compatible:** WordPress 5.0+
**Dernière mise à jour:** 2024
