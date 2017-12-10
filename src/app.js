const KoaStatic = require('koa-static')
const Koa = require('koa')
const app = new Koa()

const NODE_ENV = process.env.NODE_ENV || 'production'
const HOST = process.env.SERVICE_HOST || 'localhost'
const PORT = process.env.PORT || process.env.SERVICE_PORT || 8080
const THEME = process.env.THEME || 'alone'

app.use(async (ctx, next) => {
  const { url } = ctx
  if (NODE_ENV !== 'test') { console.log(`request at ${url}`) }
  if (url === '/healthz') {
    ctx.body = `${new Date()}`
  } else {
    await next()

    const assets = /\/assets\/.*/gi.test(url)
    const images = /\/images\/.*/gi.test(url)

    if (!assets && !images) {
      ctx.status = 404
    }
  }
})

app.use(KoaStatic(`${__dirname}/static/${THEME}`))

app.listen(PORT)

if (NODE_ENV !== 'test') { console.log(`server running at http://${HOST}:${PORT}`) }

exports.NODE_ENV = NODE_ENV
exports.HOST = HOST
exports.PORT = PORT
