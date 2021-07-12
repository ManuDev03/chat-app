const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 5000
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

let count = 0
io.on('connect',(socket) => {
    console.log('a new websocket connection..')
    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
    io.emit('countUpdated', count)
    })
})

server.listen(port,() => {
    console.log(`server is running on port ${port}!`)
})