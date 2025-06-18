# StepStyle - E-commerce de Chaussures

StepStyle est une plateforme e-commerce moderne pour la vente de chaussures, offrant une expérience d'achat fluide et sécurisée.

## Fonctionnalités

- Catalogue de produits avec filtrage par catégorie
- Système de panier avec persistance localStorage
- Intégration Stripe pour les paiements sécurisés
- Interface utilisateur responsive et moderne
- Authentification utilisateur
- Tableau de bord administrateur
- Gestion des commandes

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/stepstyle.git
cd stepstyle
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```env
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_PUBLIC_KEY=pk_test_votre_cle_publique
DOMAIN=http://localhost:3000
NODE_ENV=development
SESSION_SECRET=votre_secret_de_session
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

## Déploiement sur Vercel

1. Installer Vercel CLI :
```bash
npm i -g vercel
```

2. Se connecter à Vercel :
```bash
vercel login
```

3. Déployer :
```bash
vercel
```

## Configuration Stripe

1. Créer un compte sur [Stripe](https://stripe.com)
2. Récupérer vos clés API dans le dashboard Stripe
3. Configurer les webhooks dans le dashboard Stripe avec l'URL de votre site
4. Ajouter les clés dans votre fichier `.env`

## Structure du Projet

```
stepstyle/
├── api/                    # API Routes (Vercel Serverless Functions)
├── components/             # Composants réutilisables
├── css/                    # Styles
├── js/                    # Scripts JavaScript
├── pages/                 # Pages de l'application
└── assets/               # Images et ressources statiques
```

## Sécurité

- Protection CSRF
- Validation des entrées
- Headers de sécurité
- Sanitization XSS
- Rate limiting
- Authentification sécurisée

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Votre Nom - [@votre_twitter](https://twitter.com/votre_twitter)

Lien du projet : [https://github.com/votre-username/stepstyle](https://github.com/votre-username/stepstyle) 