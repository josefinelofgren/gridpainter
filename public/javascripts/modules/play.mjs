import {username, color} from "./user.mjs";
const socket = io();

// PLAY GAME
socket.emit('playGame', {username, color});

// MESSAGE FROM SERVER
socket.on('ready', message => {
    outputPressPlay(message)
});

// OUTPUT USER IF USER PRESS PLAY 
function outputPressPlay(message){

    let usersReadyToPlay = document.createElement('ul');
    usersReadyToPlay.setAttribute("id", "usersReadyToPlay");

    document.getElementById('gameInfo').appendChild(usersReadyToPlay);

    usersReadyToPlay.innerHTML += `<li>${message.text}</li>`
};

// INPUT USER IF USER PRESS PLAY 
function inputPressPlay(){
    
    // Emit message to server
    socket.emit('play');

    document.getElementById('playBtn').innerHTML = `<i class="fa-spin fas fa-spinner"></i>Waiting for the other players..`
};




export {inputPressPlay}