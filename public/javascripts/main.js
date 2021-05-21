let root = document.getElementById('root');
let chatMessages = document.getElementById('chatMessages');
let roomName = document.getElementById('roomName');
let userList = document.getElementById('userList');
const socket = io();


// GET USERNAME AND COLOR FROM URL 
const {username, color} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// JOIN GAME
socket.emit('joinGame', {username, color});


// MESSAGE FROM SERVER
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down to last message 
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
});


// MESSAGE SUBMIT
function getMessage(e){
    e.preventDefault();

    // Get message
    let inputMsg = document.getElementById('inputMsg').value;

    // Emit message to server
    socket.emit('chatMessage', inputMsg);

    // Clear inputfield 
    document.getElementById('inputMsg').value = "";
};

// OUTPUT MESSAGE 
function outputMessage(message){

    document.getElementById('chatMessages').innerHTML += `<div class="message" style="background-color:${message.color};">
                                                         <p class="message-info">${message.username} <span>${message.time}</span></p>
                                                         <p class="message-text">${message.text}</p>
                                                         </div>`
    
};
