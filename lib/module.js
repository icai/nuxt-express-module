const path = require('path')
const express = require('express')
const chokidar = require('chokidar')
const decache = require('decache')

module.exports = function ExpressModule (moduleOptions) {
  const cwdPath = this.options.srcDir

  const options = {
    expressPath: 'express',
    routesPath: 'express/routes',
    ...moduleOptions
  }

  const app = express()
  const routesPath = path.join(cwdPath, options.routesPath)

  app.use((req, res, next) => {
    require(routesPath)(req, res, next)
  })

  // handle hot loading of routes
  // re-initializes everything when file changes inside express dir
  if (this.options.dev) {
    const expressPath = path.join(cwdPath, options.expressPath)
    const watcher = chokidar
      .watch(expressPath)
      .on('change', (path) => {
        const keys = Object.keys(require.cache).filter(k => k.includes(expressPath))
        keys.forEach(k => decache(k))
      })

    this.nuxt.hook('close', () => {
      watcher.close()
    })
  }

  this.addServerMiddleware(app)
}
