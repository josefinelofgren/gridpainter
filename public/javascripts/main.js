
const socket = io();

import {inputMessage} from "./modules/chat.mjs";
import {color} from "./modules/user.mjs";
import { awaitPlayers} from './modules/play.mjs';
import {createGrid, saveDrawnPic, printSavedPics, downState, colorCell} from "./modules/paint.mjs";

const canvasGrid = document.querySelector('#canvas');
const paint = document.querySelector('#paint');
const erase = document.querySelector('#erase');
const save = document.querySelector('#save');
const reset = document.querySelector('#reset');
const saveArray = document.querySelector('#saveArray');
const printSavedPicsBtn = document.querySelector('#optionsBtn');


//user color
let userColor = color;
let savedPic; 

//generate grid/canvas
createGrid(canvasGrid, 25, 25);

//set userColor as a color
paint.addEventListener('click', () =>  userColor = color );

//set userColor as null
erase.addEventListener('click', () => userColor = null);

// reset canvas
reset.addEventListener('click', () => {
    // confirm then reset canvas 
    if(confirm("Are you sure you want to reset this canvas?")){
      socket.emit('reset');
    };
  });

//save drawn pic
save.addEventListener("click", () => saveDrawnPic(saveArray)); // name from input to array 

//show saved pics in potions under select
printSavedPicsBtn.addEventListener("click", ({target}) => printSavedPics(target));

//colorCell on mouseover
canvas.addEventListener('mouseover', ({target}) => colorCell(target, userColor));

// mousedown => down = true
canvas.addEventListener('mousedown', ({target}) => downState(target, userColor));

//on click "play/stop"
document.getElementById('btnBox').addEventListener('click', ({target}) => awaitPlayers(target));



/////////////////////////// CHAT /////////////////////////// 

// SEND CHAT MESSAGE 
document.getElementById('btnMsg').addEventListener('click', function(e){
    e.preventDefault();
    inputMessage();
});
