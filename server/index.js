const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server)
const osc = require('osc-min')
const dgram = require('dgram')
const udp = dgram.createSocket('udp4')

const ip = '127.0.0.1'
const inputPort = 6448
const webpagePort = 3004
const outputPort = 12000

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

inputDeviceData = (x, y) => {
  const  buf = osc.toBuffer({
    address: "/wek/inputs",
    args: [{
      type: "float", value: x,
      type: "float", value: y
    }]
  })
  
  console.log('x, y', x, y)
  return udp.send(buf, 0, buf.legth, inputPort, ip)
}

io.on('connection', socket => {
  socket.emit('ping', "WebSocket link works");
  socket.on('inputData', data => inputDeviceData(data.x, data.y))

  const sock = dgram.createSocket({type:"udp4",reuseAddr:true}, (msg, rinfo) => {
    try {
      const oscmsg = osc.fromBuffer(msg)
      socket.emit('outputData', oscmsg)
    } catch (e) {
      return console.log("invalid OSC packet", e)
    }
  })

  sock.bind(outputPort)
})

app.get('/', function(req, res,next) {
  res.send("It works!")
});

server.listen(webpagePort, 'localhost')