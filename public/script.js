var socket = io(); //need to create the socket object

// let btn = document.getElementById('btn');
// btn.onclick = function exec(){
//     socket.emit('from_client'); //emiting event from the client
// }

// socket.on('from_server', () => {  //socket.on is used to listen to the emitted events
//     const div = document.createElement('div');
//     div.innerText = 'New Event from Server';
//     document.body.appendChild(div);
// })

//the above code was for testing basic setup

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

btn.onclick = function exec(){
    socket.emit('msg_send', {   //we can also send our msg with the emitted event
        msg: inputMsg.value
    })
}

socket.on('msg_rcvd', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msgList.appendChild(limsg);
})