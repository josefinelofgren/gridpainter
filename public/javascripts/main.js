const socket = io();
import {inputMessage} from "./modules/chat.mjs";
import {inputPressPlay} from "./modules/play.mjs";
import {color, username} from "./modules/user.mjs";

console.log('color', color);
<<<<<<< HEAD
=======
// import { findRandomPic, playBtnAction, compare } from './modules/play.mjs';
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62
import { findRandomPic, awaitPlayers, runTimer, compare } from './modules/play.mjs';
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
createGrid(canvasGrid, 25, 25);

//set userColor as a color
paint.addEventListener('click', () =>  userColor = color );

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

<<<<<<< HEAD
const players = []
=======

// //on click "play/stop"
// document.getElementById('playBtn').addEventListener('click', ({target}) => {
//   playBtnAction(target, savedPic);
//   inputPressPlay();
// });
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62
//on click "play/stop"
document.getElementById('btnBox').addEventListener('click', ({target}) => awaitPlayers(target));



/////////////////////////// CHAT /////////////////////////// 

// SEND CHAT MESSAGE 
document.getElementById('btnMsg').addEventListener('click', function(e){
    e.preventDefault();
    inputMessage();
});