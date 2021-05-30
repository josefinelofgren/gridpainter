import {username, color} from "./user.mjs";

let root = document.getElementById('root');
const socket = io();

// JOIN GAME
socket.emit('joinGame', {username, color});


// MESSAGE FROM SERVER
socket.on('message', message => {
    outputMessage(message);

    // Scroll down to last message 
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
});


// OUTPUT MESSAGE 
function outputMessage(message){

    // print chat message with username and time 
    document.getElementById('chatMessages').innerHTML += `<div class="message" style="background-color:${message.color};">
                                                         <p class="message-info">${message.username} <span>${message.time}</span></p>
                                                         <p class="message-text">${message.text}</p>
                                                         </div>`
    
};


// INPUT MESSAGE 
function inputMessage(){
    
    // Get message
    let inputMsg = document.getElementById('inputMsg').value;

    // Emit message to server
    socket.emit('chatMessage', inputMsg);

    // Clear inputfield 
    document.getElementById('inputMsg').value = "";
}


export {inputMessage}
