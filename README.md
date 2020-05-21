# Sapper Template 😎
> A modern Sapper template

![GitHub language count](https://img.shields.io/github/languages/count/ethanthatonekid/sapper-template)
![GitHub repo size](https://img.shields.io/github/repo-size/ethanthatonekid/sapper-template)
![GitHub forks](https://img.shields.io/github/forks/ethanthatonekid/sapper-template?style=social)

## About 🧠
This Svelte/Sapper template allows you to deploy to GitHub pages and use TypeScript in your Sapper files. What an amazing time to be alive!

## Getting Started 🌌

#### 0) Install system prerequisites.
* Install [Git](https://git-scm.com/downloads).
* Install [Node](https://nodejs.org/en/download/).

#### 1) Use this GitHub repository as a template.
Follow [this link](https://github.com/EthanThatOneKid/sapper-template/generate) to generate a new repository from this template.

#### 2) Clone your new repository to your preferred development environment.
```bash
git clone https://github.com/[YOUR USERNAME]/[YOUR REPO NAME].git
```

#### 3) Install the project dependencies.
Note: Now that you have the [package.json](package.json) file, you may edit the details custom to your project (e.g. the `name` property and various others).
```bash
cd [YOUR REPO NAME]
npm i
```

#### 4) Spin up a development server and get to coding!
Firstly, rename the [SAMPLE.env](SAMPLE.env) file to just `.env` and fill it out with your own respected secrets.
```bash
npm run dev
```
Your development server should be accessible from `http://localhost:3000/[PROJECT NAME]`.

## Deployment ⚡
After completing the [Getting Started](#getting-started) instructions, you may begin your deployment process. Then, you may run the [deployment script](scripts/deploy.js).
```bash
npm run deploy
```
Your deployed webapp should be accessible at a URL with the following templating: `https://[YOUR USERNAME].github.io/[YOUR REPO NAME]`

## Reference 🤓
* [Svelte docs](https://svelte.dev/)
* [Sapper docs](https://sapper.svelte.dev/)
* [TypeScript docs](https://www.typescriptlang.org/docs/home.html)

## Contributing 🔥
Visit the [contribution docs](docs/CONTRIBUTING.md). This project was built using [this template](https://github.com/pyoner/svelte-typescript/tree/master/packages/sapper-template).

<a href="https://www.buymeacoffee.com/etok" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 25px !important;" ></a>

---

Created with 💖 by [EthanThatOneKid](https://github.com/EthanThatOneKid)