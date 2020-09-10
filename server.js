//require('dotenv').config();
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist/socket-frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/socket-frontend/index.html'))
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg);
    });
});

http.listen(port, () => {
    console.log('listening on :' + port.toString())
});
