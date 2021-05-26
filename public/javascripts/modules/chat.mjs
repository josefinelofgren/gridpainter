import {username, color} from "./user.mjs";

let root = document.getElementById('root');
const socket = io();

//gör detta i paint med savedPic. kommer från import och skickas till server
//socket.emit('paint', savedPic);

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



// // MESSAGE FROM SERVER
// socket.on('ready', message => {
//     outputPressPlay(message)
// });

// // OUTPUT USER IF USER PRESS PLAY 
// function outputPressPlay(message){

//     let usersReadyToPlay = document.createElement('ul');
//     usersReadyToPlay.setAttribute("id", "usersReadyToPlay");

//     document.getElementById('gameInfo').appendChild(usersReadyToPlay);

//     usersReadyToPlay.innerHTML += `<li>${message.text}</li>`
// };

// // INPUT USER IF USER PRESS PLAY 
// function inputPressPlay(){
    
//     // Emit message to server
//     socket.emit('play');

//     document.getElementById('playBtn').innerHTML = `<i class="fa-spin fas fa-spinner"></i>Waiting for the other players..`
// }


// function play(){

//     if(document.getElementById('usersReadyToPlay').innerHTML)

//     document.getElementById('usersReadyToPlay').innerHTML
// }



export {inputMessage}
