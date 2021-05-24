const socket = io();
import {inputMessage} from "./modules/chat.mjs";
import {inputPressPlay} from "./modules/play.mjs";


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
canvas.addEventListener('mouseover', ({target}) =>  colorCell(target));

// mousedown => down = true
canvas.addEventListener('mousedown', ({target}) => downState(target));


//on click "play/stop"
document.getElementById('playBtn').addEventListener('click', ({target}) => {
  playBtnAction(target, savedPic);
  inputPressPlay();
});



/////////////////////////// CHAT /////////////////////////// 

// SEND CHAT MESSAGE 
document.getElementById('btnMsg').addEventListener('click', function(e){
    e.preventDefault();
    inputMessage();
});