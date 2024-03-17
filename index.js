const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const isDev = app.settings.env === 'development';
const url = isDev ? 'http://localhost:3000' : 'https://paper-canvas.vercel.app'
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors : url
});

// middleware
app.use(cors({
    origin: url
}))


io.on("connection",(socket)=>{
console.log("server connected");
socket.on("beginPath",(arg)=>{
    socket.broadcast.emit('beginPath',arg);
})
socket.on("drawLine",(arg)=>{
    socket.broadcast.emit('drawLine',arg);
})
socket.on("changeConfig",(arg)=>{
    socket.broadcast.emit('changeConfig',arg);
})
})

httpServer.listen(8000,(req,res)=>{
    console.log('https server listening');
});