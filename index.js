const express = require('express');
const app = express();
const connect = require('./config/database-config');
const Chat = require('./models/chat');

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

    socket.on('join_room', (data) => {  // to join a specific room
        socket.join(data.roomid);
    });

    socket.on('msg_send', async(data) => {
        // io.emit('msg_rcvd', data);  //after recieving the msg, the server will emit this event to all the socket connections 
        const chat = await Chat.create({ //storing the chats in db
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        })
        io.to(data.roomid).emit('msg_rcvd', data); //now it will be emiting it only the particular room id
    })
    
})

app.set('view engine', 'ejs'); //for showing html from server we need to setup a view engine, here it is ejs, npm i ejs

app.use('/', express.static(__dirname + '/public')); //using this we can server our static files using express , like html css and other

app.get('/chat/:roomid', async (req, res) => { //set up a route directly for chat
    const chats = await Chat.find({
        roomId: req.params.roomid
    }).select('content user')
    res.render('index', {
        id: req.params.roomid, //we can send data from here to the ui
        chats: chats
    }); // showing the ui directly from server
});

server.listen(3000, async() => { //used server.listen instead of app.listen because we want to create web server and get connected to the web socket
    console.log('Server started on port 3000');
    await connect();
    console.log('mongodb connected');
})