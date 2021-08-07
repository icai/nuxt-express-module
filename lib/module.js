
import path from 'path'
import express from 'express'
import chokidar from 'chokidar'
import decache from 'decache'
import isRequire from '@w3cub/isrequire'

export default function ExpressModule (moduleOptions) {
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
      this.nuxt.resolver.requireModule(setupPath)(app)
    } else {
      app.use((req, res, next) => {
        this.nuxt.resolver.requireModule(routesPath)(req, res, next)
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
      .on('change', () => {
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
};
