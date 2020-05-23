<p align="center">
  <a href='https://github.com/daily-targum/front-end-shared-submodule/actions'>
    <img src='https://github.com/daily-targum/front-end-shared-submodule/workflows/Default/badge.svg'>
  </a>

  <a href="https://codecov.io/gh/daily-targum/front-end-shared-submodule">
    <img src="https://codecov.io/gh/daily-targum/front-end-shared-submodule/branch/master/graph/badge.svg" />
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/daily-targum/front-end-shared-submodule">
</p>

---

* 🚀 [Getting Started](#-getting-started)
* ✅ [Testing](#-testing)
* 💻 [Environment Variables](#-environment-variables)

**IMPORTANT NOTE: This app is open source, but it requires API keys to run. For now, these keys are only for internal use within the company.**

## 🚀 Getting Started

Please see the following repos for usage

* [Daily Targum App]()
* [Daily Targum Website]()


## ✅ Testing

  * Check for TypeScript errors

      ```bash
      yarn typescript
      ```

  * Jest tests

      ```bash
      yarn test
      ```

## 💻 Environment Variables

Setup

```bash
# This file must be called .env NOT .env.local
cp .env.example .env

# Open .env and set varabiles
```

The following environment variables are required.

```bash
# .env.example

# AWS AppSync Config 
AWS_APPSYNC_URL=
AWS_APPSYNC_REGION=
AWS_APPSYNC_API_KEY=
```

Adding environment variables requires changing the following files:

* This repo
  * `__mocks__/expo-constants.ts`
  * `gotenv.js`
  * `.env.example`
  * `.github/workflows/*`
* Local
  * `.env` (on your local machine)

_Files responsible for configuring environment variables are commented `ENVIRONMENT VARIABLES` so you can easily be found._