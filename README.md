# Ghislain JOB, site personnel

Site personnel bilingue (français / anglais) de **Ghislain JOB**, doctorant en droit privé à l'Université Grenoble Alpes (Centre de Recherches Juridiques), spécialisé en droit du sport et transition écologique.

Le site présente ses recherches, ses enseignements, sa pratique du droit du sport et son parcours.

> En ligne : `https://<votre-pseudo>.github.io` (à remplacer une fois le site publié)

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : présentation, domaines, thèse, orientation selon le profil du visiteur, actualité |
| `recherche.html` | Thèse, champs de recherche, publications, communications |
| `enseignement.html` | Travaux dirigés (UGA), programme STEEN (Sciences Po Grenoble), approche pédagogique |
| `pratique.html` | Pratique du droit du sport en cabinet, engagements |
| `parcours.html` | Frise du parcours, sports pratiqués, compétences, langues, certifications |
| `contact.html` | Coordonnées |

## Structure du dépôt

```
.
├── index.html
├── recherche.html
├── enseignement.html
├── pratique.html
├── parcours.html
├── contact.html
├── style.css      # toute la mise en forme (couleurs, typographie, animations)
├── app.js         # langue FR/EN, menu mobile, animations, compteurs
├── img/           # photos
└── README.md
```

Le site est entièrement **statique** : du HTML, du CSS et un peu de JavaScript, sans framework, sans base de données et sans étape de compilation.

## Fonctionnalités

- **Bilingue FR / EN** : un bouton dans l'en-tête bascule la langue, et le choix est mémorisé d'une page à l'autre.
- **Responsive** : mise en page adaptée aux téléphones, avec un menu mobile.
- **Animations** : apparition des sections au défilement, bandeau défilant, compteurs, frise qui se remplit, transitions entre les pages dans les navigateurs compatibles.
- **Accessibilité** : lien d'accès direct au contenu, focus clavier visible, respect du réglage « réduire les animations » du système.

## Voir le site en local

Les liens vers l'accueil pointent vers `./`, il vaut donc mieux passer par un petit serveur local plutôt que d'ouvrir le fichier directement :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000> dans le navigateur.

## Publier avec GitHub Pages

1. Créer un dépôt public nommé `<votre-pseudo>.github.io`.
2. Y déposer tous les fichiers de ce dossier (bouton **Add file > Upload files**, ou `git push`).
3. Dans **Settings > Pages**, choisir la source **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Après une ou deux minutes, le site est en ligne à `https://<votre-pseudo>.github.io`.

Pour un nom de domaine personnel (par exemple `ghislainjob.fr`), l'indiquer dans **Settings > Pages > Custom domain** et suivre les instructions DNS de GitHub. Penser à cocher **Enforce HTTPS**.

## Modifier le contenu

- **Textes** : chaque texte existe en deux versions, côte à côte dans le HTML :

  ```html
  <span data-l="fr">Texte en français</span><span data-l="en">English text</span>
  ```

  Il faut modifier les deux versions pour garder le site cohérent.

- **Photos** : remplacer les fichiers dans `img/` en gardant le même nom, ou modifier l'attribut `src` dans la page concernée.
- **Couleurs et polices** : elles sont regroupées au début de `style.css`, dans le bloc `:root`.

## Polices

Les polices sont chargées depuis Google Fonts :

- Big Shoulders Display (titres)
- Newsreader (texte courant)
- Instrument Sans (interface)

Le chargement depuis les serveurs de Google transmet l'adresse IP des visiteurs à Google. Pour éviter tout transfert de ce type au regard du RGPD, les polices peuvent être téléchargées et hébergées dans le dépôt.

## Droits

Le code du site peut être réutilisé librement. Les textes et les photographies restent la propriété de Ghislain JOB et ne peuvent pas être réutilisés sans son accord.
