# Steam Games

Live version can be found @ <a href="https://steam-games.vercel.app/" target="_blank">steam-games.vercel.app</a>

## Description

App for displaying a users collection of Steam games, latest news, and achievements. Utilizing the official [Steam API](https://steamcommunity.com/dev).

Some data might be missing or displayed incorrectly, for example missing images and game descriptions displaying in different languages. This is due the the data we have available to us from the Steam API.

## Screenshots

<img src="/public/screenshot-01.png?raw=true" alt="Steam Home Page Desktop" />

<img src="/public/screenshot-02.png?raw=true" alt="Steam Game Page Desktop" />

<img src="/public/screenshot-03.png?raw=true" alt="Steam Home Page Mobile" width="320" />

<img src="/public/screenshot-04.png?raw=true" alt="Steam Game Page Mobile" width="320" />

## Requirements

For development, you will only need Node.js installed on your machine.

[Node](http://nodejs.org/) is really easy to install & now includes [NPM](https://npmjs.org/).

You should be able to run the following commands after the installation.

    $ node --version
    $ npm --version

---

## Install

    $ git clone https://github.com/robFraser1111/steam-games.git
    $ cd PROJECT
    $ npm i

### Configure app

Register for a [Steam API Key](https://steamcommunity.com/dev) and update the .env file.

## Start & watch

    $ npm run dev

## Simple build for production

    $ npm run build

---

## Languages & tools

- [Next JS](https://nextjs.org/) React Framework.
- [TypeScript](https://www.typescriptlang.org/) JavaScript with syntax for types.
- [Node](https://nodejs.org/en/) Asynchronous event-driven JavaScript runtime.
- [Styled Components](https://styled-components.com/) CSS is JS.
- [SWR](https://swr.vercel.app/) React Hooks for Data Fetching.
- [Passport](http://www.passportjs.org/) Authentication for Node.js.

## Repo structure

Directory structure of full-stack JS app.

```
/
├─ .next/                       # Next build folder
├─ components/                  # React components
├─ context/                     # React context api for state management
├─ lib/                         # Next Router config and steam passport strategy
├─ node_modules/                # Packages for app
├─ pages/                       # App pages including api and authentication routes
├─ public/                      # Media
├─ .babelrc                     # Babel config
├─ .env                         # Environment variables
├─ .env.sample                  # Environment variables example
├─ .gitignore                   # List of files to ignore for repo
├─ next-env.d.ts                # TypeScript settings for Next
├─ next.config.js               # Next configuration
├─ package-lock.json            # Versioned dependencies
├─ package.json                 # Dependencies and scripts
├─ README.md                    # This file
└─ tsconfig.json                # TypeScript configuration
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
