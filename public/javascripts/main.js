
import {createGrid, saveDrawnPic, printSavedPics, printImage, downState, colorCell} from "./modules/paint.mjs";
//////////////////////////


const facitGrid = document.querySelector('#facit');
const canvasGrid = document.querySelector('#canvas');
const paint = document.querySelector('#paint');
const erase = document.querySelector('#erase');
const save = document.querySelector('#save');
const saveArray = document.querySelector('#saveArray');
// optionsBtn already declared under different name?
const printSavedPicsBtn = document.querySelector('#optionsBtn');
const printListContainer = document.getElementById("printList");

let root = document.getElementById('root');
let chatMessages = document.getElementById('chatMessages');
let roomName = document.getElementById('roomName');
let userList = document.getElementById('userList');
const socket = io();


//array of random pic-arrays
const randomPics = [
    [
        {name: "facit", id: "row1cell1", color: "purple"}, 
        {name: "facit", id: "row1cell2", color: "purple"}, 
        {name: "facit", id: "row2cell1", color: null},
        {name: "facit", id: "row2cell2", color: null}
    ],
    [
        {name: "facit", id: "row1cell1", color: "green"}, 
        {name: "facit", id: "row1cell2", color: "green"}, 
        {name: "facit", id: "row2cell1", color: "black"},
        {name: "facit", id: "row2cell2", color: "green"}
    ],
    [
        {name: "facit", id: "row1cell1", color: "blue"}, 
        {name: "facit", id: "row1cell2", color: "green"}, 
        {name: "facit", id: "row2cell1", color: "orange"},
        {name: "facit", id: "row2cell2", color: "green"}
    ],
    [
        {name: "facit", id: "row1cell1", color: "blue"}, 
        {name: "facit", id: "row1cell2", color: "green"}, 
        {name: "facit", id: "row2cell1", color: "orange"},
        {name: "facit", id: "row2cell2", color: "pink"}
    ],
    [
        {name: "facit", id: "row1cell1", color: "blue"}, 
        {name: "facit", id: "row1cell2", color: "green"}, 
        {name: "facit", id: "row2cell1", color: "red"},
        {name: "facit", id: "row2cell2", color: "red"}
    ]
];

//ALL PAINT.MJS NEEDS IN MAIN: 

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
save.addEventListener("click", () => saveDrawnPic(saveArray.value)); // name from input to array 

//show saved pics in potions under select
printSavedPicsBtn.addEventListener("click", ({target}) => printSavedPics(target));

//colorCell on mouseover
canvas.addEventListener('mouseover', ({target}) =>  colorCell(target, userColor));

// mousedown => down = true
canvas.addEventListener('mousedown', ({target}) => downState(target, userColor));

//END OF NEEDED FOR PAINT.MJS



//DO WE NEED ANY OF THESE THINGS ANYMORE?? 
//export to paint /////////
// //initial array for drawing pic
// let savedPic = [];



// //on click "play"
// document.getElementById('playBtn').addEventListener('click', () => {
//   //find random image to copy
//   findRandomPic(randomPics);

// //print timer stuff inid =  gameInfo

//   // pause();
//   // cron = setInterval(() => {
//   //   timer();
//   // }, 10);

//   // const temp? = `  
//   // <span id="hour">00</span>:<span id="minute">00</span>:<span
//   // id="second"
//   // >00</span
//   // >`;

//   //when timer has ended run compare
//     //print % accurate
//     compare(facit, drawnPic);

// });


// //find random pic function
// function findRandomPic(randomPics) {

//   let index = Math.floor(Math.random() * 5); //generate random number 0-5
//   facit = [...randomPics[index]]; //user random number as index
//   printImage(facitGrid, facit, 2, 2);  

// };



//exportet to paint ////////////

// //genereate a grid structure
// function createGrid(pixelCanvas, gridHeight, gridWidth) {
 
//     // Creates rows 
//     for (let row = 1; row <= gridHeight; row++) {
        
//         let gridRow = document.createElement('tr');
//         gridRow.id = "canvas" + row; 
//         pixelCanvas.appendChild(gridRow);

//         //create cells
//         for (let cell = 1; cell <= gridWidth; cell++) {
            
//             let gridCell = document.createElement('td');
//             gridCell.id = "row" + row + "cell" + cell;
//             gridRow.appendChild(gridCell);

//             //push cell id and color to array
//             if(gridRow.id.includes("canvas")) {
//               savedPic.push({name: "canvas", id: gridCell.id, color: null});  
//             };
//         };
//     };
// };

//export to paint /////////////////
// //pain
// paint.addEventListener('click', () =>  userColor = "purple" );

//export to paint /////////////////
// //erase 
// erase.addEventListener('click', () => userColor = null);

//export to paint /////////////////
// //save drawn pic
// save.addEventListener("click", () => {

//     //get string from input
//     let picName = saveArray.value;
//     // give new array name from input
//     let drawnPic = saveArray.value;
   
//     //spread array
//     drawnPic = [...savedPic];
//     //empty savedPic array
//     savedPic = [];

//     //push to array with all saved pics
//     allDrawnPics.push(drawnPic)
//     //empty drawn pic?? 

//     //repace "canvas" in name with input value
//     for (let obj in drawnPic) {
//         let newName = drawnPic[obj].name.replace("canvas", saveArray.value)
//         drawnPic[obj].name = newName;
//     };

    
//     //reprint the image (temporarily placed here)
//     //printImage(canvasGrid, drawnPic, 2, 2);


// });
//exportet to paint ////////////////////
// //se saved images
// printSavedPics.addEventListener("click", ({target}) => {

//     for (let index in allDrawnPics) {
 
//         printSavedPics.insertAdjacentHTML("beforeend", `
//         <option id="${allDrawnPics[index][0].name}">${allDrawnPics[index][0].name}</option>`);

//         //need this if there are more obj in array? :
        
//         // for (let pic in allDrawnPics[index]) {
//         //     console.log('pic', allDrawnPics[index][pic].name);
//         //     printListContainer.insertAdjacentHTML("beforeend", `<li id="${allDrawnPics[index][pic].name}">${allDrawnPics[index][pic].name}</li>`)
//         // }
//     }; 
    
//     //find index of target array in allDrawnPics 
//     if(target.id !== "optionsBtn") {
        
//         let index = allDrawnPics.findIndex( (arr) => arr[0].name === target.id );
   
//         //find array to print by index
//         let printArray = allDrawnPics[index];
//         //when resave pic make sure to either splice? or push to array (no duplicates!)
//         printImage(canvasGrid, printArray, 2, 2);
//     };
    
// });

//export to paint
// //print selected image/facit 
// function printImage(canvasGrid, drawnPic, gridHeight, gridWidth) {
    
//     //canvas.innerHTML = "";

//     // creates rows 
//     for (let row = 1; row <= gridHeight; row++) {
        
//         let gridRow = document.createElement('tr');
//         gridRow.id = "row" + row; 
//         gridRow.name = drawnPic[0].name;
//         canvasGrid.appendChild(gridRow);/////

//         //create cells
//         for (let cell = 1; cell <= gridWidth; cell++) {
            
//             let gridCell = document.createElement('td');
//             gridCell.id = gridRow.id + "cell" + cell;
//             gridRow.appendChild(gridCell);

//             //find saved pics background color 
//             const foundCell = drawnPic.find( ({ id }) => id === gridCell.id );

//             //apply color to new grid cell
//             gridCell.style.backgroundColor = foundCell.color;
         
//         };
//     };
// };


// //compare images accuracy
// function compare (picToCopy, drawnPic) {

//     let x = 0;
    
//     //loop through picToCopy
//     for (let obj in picToCopy) {
      
//         //find obj in createdGrid through id
//         const foundObj = drawnPic.find( ({ id } ) => id === picToCopy[obj].id );
     
//         //if picToCopy color == equivilant cell in createdGrid
//         if(picToCopy[obj].color === foundObj.color) x++; //add +1 to every equal

//     };

//     //print in right place later = % accuracy of picture
//     //print in id gameInfo
//     console.log(drawnPic[0].name + " is " + x / picToCopy.length * 100 + "% right");
// };

//all mouse behaviour esport to paint //////////////////////
///////////////////// MOUSE BEHAVIOUR ///////////////////
//declare down as false before mousedown so mouseover does not pain
// let down = false;

// // mousedown => down = true
// canvas.addEventListener('mousedown', ({target}) => {
    
//     //after mousedown => down == true so mouseover does pain
//     down = true;

//     //mouseup => down = false
//     canvas.addEventListener('mouseup', () => down = false);

//     //if mouse down and leaving grid => down = false
//     canvas.addEventListener('mouseleave', () => down = false);
    
//     //colorCell on mousedown
//     colorCell(target, userColor);
   
// });


// //colorCell on mouseover
// canvas.addEventListener('mouseover', ({target}) => colorCell(target, userColor));


// //to color cell
// function colorCell(target, userColor) {

//     //if down is true
//     if(down) {
       
//         //get current cell 
//         let currentCell = document.getElementById(`${target.id}`);
    
//         //change cells bg color
//         currentCell.style.backgroundColor = userColor; 
        
//         //find cell and change color in array;
//         let foundCell = savedPic.find(i => i.id === target.id)
//         foundCell.color = userColor;
        
//     };
    
// };



///////////////////////////// END OF "DO WE NEED ANY OF THESE THINGS ANYMORE?"/PAINT/PLAY STUFF










// GET USERNAME AND COLOR FROM URL
const { username, color } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// JOIN GAME
socket.emit('joinGame', { username, color });

// Get users
socket.on('users', ({ users }) => {
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down to last message
  document.getElementById('chatMessages').scrollTop =
    document.getElementById('chatMessages').scrollHeight;
});

// MESSAGE SUBMIT
function getMessage(e) {
  e.preventDefault();

  // Get message
  let inputMsg = document.getElementById('inputMsg').value;

  // Emit message to server
  socket.emit('chatMessage', inputMsg);

  // Clear inputfield
  document.getElementById('inputMsg').value = '';
}

// OUTPUT MESSAGE
function outputMessage(message) {
  document.getElementById(
    'chatMessages'
  ).innerHTML += `<div class="message" style="background-color:${message.color};">
        <p class="message-info">${message.username} <span>${message.time}</span></p>
        <p class="message-text">${message.text}</p>
    </div>`;
}

// // Add users to DOM
// function outputUsers(users){

//     userList.innerHTML = "";

//     for (user in users){
//         console.log(users[user]);
//         userList.innerHTML += `<li>${users[user].username}</li>`
//     }

// };

//TIMER functions
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;



// document.getElementById('doneBtn').addEventListener('click', () => {
//   pause();
// });

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;

  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input > 9 ? input : `0${input}`;
}
