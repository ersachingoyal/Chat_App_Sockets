const express = require('express');
const app = express();

//basic setup for socketio
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => { //io.on to is use to listen to emitted events, which is here connection
    console.log('a user connected');

    // socket.on('from_client', () => {
    //     console.log('event coming from client');
    // })
    
    // setInterval(() => {
    //     socket.emit('from_server'); //this will emit events from this side which we can listen on the other side, here the server is sending some event after every 2 seconds
    // }, 2000);

    socket.on('msg_send', (data) => {
        io.emit('msg_rcvd', data);  //after recieving the msg, the server will emit this event to all the socket connections 
    })
})

app.use('/', express.static(__dirname + '/public')); //using this we can server our static files using express , like html css and other

server.listen(3000, () => { //used server.listen instead of app.listen because we want to create web server and get connected to the web socket
    console.log('Server started on port 3000');
})