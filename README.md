This is a [Tina CMS](https://tina.io/) project for Hugo.


Branch:
- git checkout design-1


## Setup

- Fork this repo
- Clone the fork your local machine.
- This starter assumes that you have Hugo installed on your local machine. If not, reference [this guide](https://gohugo.io/getting-started/installing/).

## Local Development

Install the project's dependencies:

```
pnpm install
```
[[
vérifier
````
pnpm add ffmpeg-static
``
]]

Run the project locally:

```
pnpm dev
```

Open [http://localhost:1313](http://localhost:1313) with your browser to see the result.

### Building the Starter Locally (Using the hosted content API)

Replace the `.env.example`, with `.env`

```
TINA_CLIENT_ID=<get this from the project you create at app.tina.io>
TINA_TOKEN=<get this from the project you create at app.tina.io>
TINA_BRANCH=<Specify the branch with Tina configured>
```

Build the project:

```bash
pnpm build
```

## Deploying the Site

This project can easily be deployed using services like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). 

### Build settings

In general, the build settings will look like so:

<img width="908" alt="hugo-build-settings" src="https://user-images.githubusercontent.com/3323181/198081223-c8830e49-2a77-4c7a-b1cf-bc9a44ca96cf.png">

### Environment variables

When setting up the Netlify/Vercel project, apply the `TINA_CLIENT_ID` & `TINA_TOKEN` environment variables from your [app.tina.io](https://app.tina.io) project. 

The Hugo theme in this starter also depends on using a specific version of Hugo. Set the following environment variable as well: `HUGO_VERSION`: `0.134.2`

## Learn More

To learn more about Tina, take a look at the following resources:

- [Tina Docs](https://tina.io/docs)
- [Getting Started Guide](https://tina.io/guides/tinacms/non-react-based-ssg/guide/)

You can check out the [Tina GitHub repository](https://github.com/tinacms/tinacms) - your feedback and contributions are welcome!

-----



## Structure du dossier


### archetypes

Le dossier archetypes est utilisé pour stocker des modèles de contenu (appelés archetypes) qui servent de base à la création de nouveaux fichiers de contenu. Ces modèles permettent de préremplir automatiquement les champs front matter (les métadonnées en en-tête) et d'ajouter des structures de contenu par défaut lors de la génération d'une nouvelle page ou publication.

L’archetype par défaut de tous les posts est celui-ci:

```
---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
tags: []
categories: []
---
```

### Assets

Dossier où est placé le code SASS et le code javascript du site. C’est ici que vous aurez besoin d’intervenir pour changer le design du site.


### Static

Le dossier `static` est utilisé pour stocker tous les fichiers statiques qui ne nécessitent pas de traitement par Hugo lors de la génération du site: images, polices, documents téléchargeables, fidhiers CSS et javascript ui ne nécessitent pas de transformation (pas de fichiers SASS) ou d'intégration spécifique dans des templates.

Le contenu du dossier `static` est copié tel quel dans le dossier final de votre site généré (public) à la racine. Cela signifie que si vous avez un fichier `static/images/logo.png`, il sera accessible à l'URL `https://votresite.com/images/logo.png` après la compilation.

Si vous utilisez un préprocesseur CSS (comme Sass ou Less), le code source des préprocesseurs devrait aller dans le dossier `assets` ou ailleurs, car Hugo peut les traiter, alors que le dossier `static` ne fait que copier les fichiers sans transformation.


### Content

Tout le contenu du site sous forme de fichiers markdown. Ils sont automatiquement créé et modifié depuis l’admin Tina, mais c’est possible de crèr et modifier directement dans ce dossier.


### Layouts (à réécrire)

Les tempaltes HTML du site pour toutes les pages. 

```
layouts/
├── _default/
│   ├── baseof.html
│   ├── single.html
│   └── list.html
├── partials/
│   ├── header.html
│   ├── footer.html
│   ├── sidebar.html
│   └── analytics.html
├── shortcodes/
│   └── custom_shortcode.html
├── index.html
└── section/
    └── section-type.html
```

Rôle des différents sous-dossiers et fichiers

- _default/ : contient les mises en page de base qui s'appliquent à tous les types de contenu. Par exemple, baseof.html est souvent utilisé comme un modèle parent qui structure la page en appelant des partials pour composer la mise en page complète.
- partials/ : contient des morceaux de HTML réutilisables, appelés à partir des autres fichiers de mise en page grâce à la fonction {{ partial "filename.html" . }}.
- shortcodes/ : contient des blocs de code réutilisables que vous pouvez insérer dans vos fichiers de contenu Markdown avec {{< custom_shortcode >}}.
index.html : utilisé pour la page d’accueil.
- section/ : contient les mises en page pour des sections spécifiques, permettant de personnaliser l’apparence d’une catégorie de contenu.


**Diagramme des relations**

```
baseof.html
│
├── partials/header.html
├── partials/navbar.html
│
└───> single.html
     │
     └── partials/analytics.html
     └── partials/footer.html
```


### Public

Le dossier où tout le site est généré. C’est ce dossier qui est envoyé pour le déploiement.

### Config.yaml

La configuration générale du site.


### Resources

Le dossier resources dans Hugo est utilisé pour stocker les fichiers générés ou transformés par Hugo lors de la génération du site. Ces fichiers peuvent inclure des ressources optimisées, des images traitées, des fichiers CSS ou JavaScript minifiés, etc. 

Typiquement, resources contient des sous-dossiers comme `_gen` : C’est là que Hugo stocke les fichiers générés automatiquement. Vous verrez souvent des dossiers tels que images, assets, ou d'autres selon les types de ressources transformées.

Ne pas modifier manuellement : Vous ne devriez pas modifier manuellement les fichiers du dossier resources, car ils sont générés par Hugo et peuvent être recréés à chaque construction.


**Exemple d'utilisation**

Supposons que vous utilisez Hugo pour redimensionner une image dans un template :

```go
{{ $image := resources.Get "images/mon-image.jpg" | resources.Resize "800x" }}
<img src="{{ $image.RelPermalink }}" alt="Image optimisée">
```

Hugo créera une version redimensionnée de mon-image.jpg et la stockera dans resources/_gen/images/. Lors des reconstructions, Hugo vérifiera si l'image redimensionnée existe déjà et l'utilisera directement, au lieu de refaire la transformation.


### node_modules, pnpm-lock.yaml

Fichiers et dossiers pour construire l’interface admin de Tina. Ne pas toucher


### Tina

Dossier pour configurer l’interface de TINA


## Copyright

https://fontsarena.com/chicago-flf-by-robin-casady/ → Robin Casady (from Casady & Greene[1]) created ChicagoFLF and released it on public domain, as a revival of Susan Kare’s Chicago font.