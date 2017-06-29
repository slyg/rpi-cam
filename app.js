const Koa = require('koa')
const route = require('koa-route')
const serve = require('koa-static')
const app = new Koa()

const Raspistill = require('node-raspistill').Raspistill
const raspistill = new Raspistill()

app.use(serve('photos/'))

app.use(route.get('/snap', async function(ctx){
  try {
    const result = await raspistill.takePhoto()
    ctx.body = {error: undefined, result}
  } catch (error) {
    ctx.body = {error, result: undefined}
  }
}))

app.listen(80)
