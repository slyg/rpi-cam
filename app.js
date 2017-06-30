const Koa = require('koa')
const route = require('koa-route')
const serve = require('koa-static')
const app = new Koa()

const RaspiCam = require('raspicam')

var camera = new RaspiCam({
	mode: 'photo',
	output: './photos/snap.jpg',
	encoding: 'jpg',
	timeout: 100 
})

app.use(serve(__dirname + '/photos'))

app.use(route.get('/snap', async function(ctx){
  try {
    const result = camera.start()
    ctx.body = { error: undefined, result }
  } catch (error) {
    ctx.body = {error, result: undefined }
  }
}))

app.listen(80)

camera.on('started', ( err, timestamp ) => {
	console.log('photo started at ' + timestamp )
})

camera.on('read', ( err, timestamp, filename )  =>  {
	console.log('photo image captured with filename: ' + filename )
})

camera.on('exit', ( timestamp )  =>  {
	console.log('photo child process has exited at ' + timestamp )
})
