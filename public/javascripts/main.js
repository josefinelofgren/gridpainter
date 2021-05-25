const socket = io();
import {username, color} from "./modules/user.mjs";
import {inputMessage} from "./modules/chat.mjs";
import {inputPressPlay} from "./modules/play.mjs";

import { findRandomPic, playBtnAction, compare } from './modules/play.mjs';
import {createGrid, saveDrawnPic, printSavedPics, printImage, downState, colorCell, userColor} from "./modules/paint.mjs";
import { randomPics } from './modules/array.mjs';


const printListContainer = document.getElementById("printList");
const facitGrid = document.querySelector('#facit');
const canvasGrid = document.querySelector('#canvas');
const paint = document.querySelector('#paint');
const erase = document.querySelector('#erase');
const save = document.querySelector('#save');
const saveArray = document.querySelector('#saveArray');
const printSavedPicsBtn = document.querySelector('#optionsBtn');

let currentUserColor;
let userArray = [];

//initial array for drawing pic
//do we still need this one here?
let savedPic = [];

//array to store all saved pics
const allDrawnPics = [];

//declare var
let facit;

//generate grid/canvas
createGrid(canvasGrid, 2, 2);


// const erase = document.querySelector('#erase');
// //set userColor as cull
// erase.addEventListener('click', () => userColor = null);

//save drawn pic
save.addEventListener("click", () => saveDrawnPic(saveArray)); // name from input to array 

//show saved pics in potions under select
printSavedPicsBtn.addEventListener("click", ({target}) => printSavedPics(target));

//colorCell on mouseover
canvas.addEventListener('mouseover', ({target}) =>  colorCell(target, userColor));

// mousedown => down = true
canvas.addEventListener('mousedown', ({target}) => {
  
  // Send cell info to server
  let id = target.id;
  socket.emit('paintCell', {id, userColor});

  downState(target, userColor);
});


// Paint cell for everyone 
socket.on('paintCell', cell => {

  // Find cell id and change background 
  document.getElementById(`${cell.id}`).style.backgroundColor = cell.userColor;

});

// function findpaintedCell(){
//   //get current cell 
//   let currentCell = document.getElementById(`${target.id}`);

//   //change cells bg color
//   currentCell.style.backgroundColor = userColor; 

//   //find cell and change color in array;
//   let foundCell = savedPic.find(i => i.id === target.id)

//   foundCell.color = userColor;
// }





//on click "play/stop"
document.getElementById('playBtn').addEventListener('click', ({target}) => {

  inputPressPlay();
  playBtnAction(target, savedPic);

});



/////////////////////////// CHAT /////////////////////////// 

// SEND CHAT MESSAGE 
document.getElementById('btnMsg').addEventListener('click', function(e){
    e.preventDefault();
    inputMessage();
});