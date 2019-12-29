const path = require('path')
const express = require('express')
const chokidar = require('chokidar')
const decache = require('decache')
const isRequire = require('@w3cub/isrequire')

module.exports = function ExpressModule (moduleOptions) {
  const cwdPath = this.options.srcDir

  const options = {
    expressPath: 'express',
    setupPath: 'express/app.js',
    routesPath: 'express/routes',
    ...moduleOptions
  }

  let app

  const handle = (req, res, next) => {
    app.handle(req, res, next)
  }

  const setupPath = path.join(cwdPath, options.setupPath)
  const routesPath = path.join(cwdPath, options.routesPath)

  const initMiddleware = () => {
    app = express()
    if (isRequire(setupPath)) {
      require(setupPath)(app)
    } else {
      app.use((req, res, next) => {
        require(routesPath)(req, res, next)
      })
    }
  }

  initMiddleware()

  // handle hot loading of routes
  // re-initializes everything when file changes inside express dir
  if (this.options.dev) {
    const expressPath = path.join(cwdPath, options.expressPath)
    const watcher = chokidar
      .watch(expressPath)
      .on('change', (path) => {
        const keys = Object.keys(require.cache).filter(k => k.includes(expressPath))
        keys.forEach(k => decache(k))
        // eslint-disable-next-line no-console
        console.log('nuxt-express-module: server changed')
        initMiddleware()
      })

    this.nuxt.hook('close', () => {
      watcher.close()
    })
  }

  this.addServerMiddleware(handle)
}
