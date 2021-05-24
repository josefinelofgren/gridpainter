import { findRandomPic, playBtnAction, compare } from './modules/play.mjs';
import {createGrid, saveDrawnPic, printSavedPics, printImage, downState, colorCell} from "./modules/paint.mjs";
import { randomPics } from './modules/array.mjs';


const printListContainer = document.getElementById("printList");
const facitGrid = document.querySelector('#facit');
const canvasGrid = document.querySelector('#canvas');
const paint = document.querySelector('#paint');
const erase = document.querySelector('#erase');
const save = document.querySelector('#save');
const saveArray = document.querySelector('#saveArray');
const printSavedPicsBtn = document.querySelector('#optionsBtn');


//initial array for drawing pic
//do we still need this one here?
let savedPic = [];

//user color
let userColor;
//array to store all saved pics
const allDrawnPics = [];

//declare var
let facit;



//generate grid/canvas
createGrid(canvasGrid, 2, 2);

//set userColor as a color
paint.addEventListener('click', () =>  userColor = "purple" );

//set userColor as cull
erase.addEventListener('click', () => userColor = null);

//save drawn pic
save.addEventListener("click", () => saveDrawnPic(saveArray)); // name from input to array 

//show saved pics in potions under select
printSavedPicsBtn.addEventListener("click", ({target}) => printSavedPics(target));

//colorCell on mouseover
canvas.addEventListener('mouseover', ({target}) =>  colorCell(target, userColor));

// mousedown => down = true
canvas.addEventListener('mousedown', ({target}) => downState(target, userColor));


//on click "play/stop"
document.getElementById('playBtn').addEventListener('click', ({target}) => playBtnAction(target, savedPic));



///////////////////////////

let root = document.getElementById('root');
let chatMessages = document.getElementById('chatMessages');
let roomName = document.getElementById('roomName');
let userList = document.getElementById('userList');
const socket = io();

// GET USERNAME AND COLOR FROM URL
const { username, color } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// JOIN GAME
socket.emit('joinGame', { username, color });

// MESSAGE FROM SERVER
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down to last message
  document.getElementById('chatMessages').scrollTop =
    document.getElementById('chatMessages').scrollHeight;
});

document.getElementById('btnMsg').addEventListener('click', function (e) {
  e.preventDefault();

  // Get message
  let inputMsg = document.getElementById('inputMsg').value;

  // Emit message to server
  socket.emit('chatMessage', inputMsg);

  // Clear inputfield
  document.getElementById('inputMsg').value = '';
});

// // MESSAGE SUBMIT
// function getMessage(e){
//     e.preventDefault();

//     // Get message
//     let inputMsg = document.getElementById('inputMsg').value;

//     // Emit message to server
//     socket.emit('chatMessage', inputMsg);

//     // Clear inputfield
//     document.getElementById('inputMsg').value = "";
// };

// OUTPUT MESSAGE
function outputMessage(message) {
  document.getElementById(
    'chatMessages'
  ).innerHTML += `<div class="message" style="background-color:${message.color};">
                                                         <p class="message-info">${message.username} <span>${message.time}</span></p>
                                                         <p class="message-text">${message.text}</p>
                                                         </div>`;
}
