var socket = io(); //need to create the socket object

let btn = document.getElementById('btn');
btn.onclick = function exec(){
    socket.emit('from_client'); //emiting event from the client
}

socket.on('from_server', () => {  //socket.on is used to listen to the emitted events
    const div = document.createElement('div');
    div.innerText = 'New Event from Server';
    document.body.appendChild(div);
})