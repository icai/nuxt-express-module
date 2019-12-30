# nuxt-express-module
[![npm (scoped with tag)](https://img.shields.io/npm/v/@w3cub/nuxt-express-module/latest.svg?style=flat-square)](https://npmjs.com/package/@w3cub/nuxt-express-module)
[![npm](https://img.shields.io/npm/dt/@w3cub/nuxt-express-module.svg?style=flat-square)](https://npmjs.com/package/@w3cub/nuxt-express-module)
[![CircleCI](https://img.shields.io/circleci/project/github/icai/nuxt-express-module.svg?style=flat-square)](https://circleci.com/gh/icai/nuxt-express-module)
[![Codecov](https://img.shields.io/codecov/c/github/icai/nuxt-express-module.svg?style=flat-square)](https://codecov.io/gh/icai/nuxt-express-module)
[![Dependencies](https://david-dm.org/icai/nuxt-express-module/status.svg?style=flat-square)](https://david-dm.org/icai/nuxt-express-module)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> 

[📖 **Release Notes**](./CHANGELOG.md)

## Features

Provides `express` and `express/routes` directory to write express routes within nuxt. The module will watch for all files within the `express` directory for changes and hot-reload without taking down the entire nuxt server.

## Setup
- Add `@w3cub/nuxt-express-module` dependency using yarn or npm to your project
- Add `@w3cub/nuxt-express-module` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@w3cub/nuxt-express-module',

    // With options
    ['@w3cub/nuxt-express-module', { /* module options */ }],
 ]
}
```

```js
// express/routes/index.js sample
const {Router} = require('express')
const router = Router()

router.get('/api/test', (req, res) => {
  res.send('hello')
})

module.exports = router

```


## Options

### expressPath
Overrides the default path of where the express directory is

### setupPath
Overrides the default path of where the express app file is

### routesPath
Overrides the default path of where express/routes/index.js is located

## Usage

Module Description

## Development

- Clone this repository
- Install dependnecies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) James Lee <uptownhr@gmail.com>
