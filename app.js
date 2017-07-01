const Koa = require('koa')
const route = require('koa-route')
const serve = require('koa-static')
const app = new Koa()
const RaspiCam = require('raspicam')

const camera = new RaspiCam({
  mode: 'photo',
  output: '/data/photos/snap.jpg',
  encoding: 'jpg',
  rotation: 90,
  timeout: 100 
})

const snapCtrl = async function(ctx){
  try {
    const success = camera.start()
    ctx.body = { error: undefined, success }
  } catch (error) {
    ctx.body = { error, success: undefined }
  }
}

const PORT = 80

camera
  .on('started', ( err, timestamp ) => console.log('photo started at ' + timestamp ) )
  .on('read', ( err, timestamp, filename ) => console.log('photo image captured with filename: ' + filename ) )
  .on('exit', ( timestamp ) => console.log('photo child process has exited at ' + timestamp ) )

app
  .use(route.get('/snap', snapCtrl))
  .use(serve('/data/photos'))
  .use(serve(__dirname + '/static'))
  .listen(PORT)

