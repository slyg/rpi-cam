const Koa = require('koa')
const route = require('koa-route')
const serve = require('koa-static')
const app = new Koa()
const RaspiCam = require('raspicam')

const camera = new RaspiCam({
	mode: 'photo',
	output: './photos/snap.jpg',
	encoding: 'jpg',
  rotation: 90,
	timeout: 100 
})

app
  .use(serve(__dirname + '/photos'))
  .use(route.get('/', ctx => {
    ctx.body = `
      <html>
        <head>
          <title>RPI Cam</title>
        </head>
        <body>
          <ul style="padding: 40px;">
            <li><a href="/snap">Take a photo</a></li>
            <li><a href="/snap.jpg">See the photo</a></li>
          </ul>
        </body>
      </html>
    `
  }))
  .use(route.get('/snap', async function(ctx){
    try {
      const success = camera.start()
      ctx.body = { error: undefined, success }
    } catch (error) {
      ctx.body = { error, success: undefined }
    }
  }))
  .listen(80)

camera
  .on('started', ( err, timestamp ) => console.log('photo started at ' + timestamp ) )
  .on('read', ( err, timestamp, filename ) => console.log('photo image captured with filename: ' + filename ) )
  .on('exit', ( timestamp ) => console.log('photo child process has exited at ' + timestamp ) )
