import {username, color} from "./user.mjs";
import { randomPics } from '../modules/array.mjs';
import { printImage, saveDrawnPic, savedPic } from '../modules/paint.mjs';

const socket = io();
const facitGrid = document.querySelector('#facit');


//find random pic function
function findRandomPic(randomPics, facit) {
  let index = Math.floor(Math.random() * 5); //generate random number 0-5
  facit = [...randomPics[index]]; //user random number as index
  //printImage(facitGrid, facit, 2, 2);
  return facit;
};


//playBtn => start or stop game
function playBtnAction(target, savedPic) {

  const button = document.getElementById(`${target.id}`);
  const timer = document.getElementById("timer");
  let counter = 60;
    
  if(button.innerText === "Play") {
    button.innerText = "Stop";
    
    //find random image to copy
    let randomPic = findRandomPic(randomPics, facit);
    printImage(facitGrid, randomPic, 2, 2);

    //start timer
    const setTimer = setInterval(function(){
      
      counter--;
      
      timer.innerHTML = `00:00:${counter}`;
      
      if(counter < 10) timer.innerHTML = `00:00:0${counter}`;
        
      if (counter <= 0) {
        endTimer(button, setTimer);
        timer.innerHTML = `00:01:00`;
      
      };

      button.addEventListener("click", () =>  {
        endTimer(button, setTimer);
      });

    }, 1000);
  };
}; 

//end timer
function endTimer(button, setTimer) {
  clearInterval(setTimer);
  button.innerText = "Play";  
  //get randomPic & savedPic, database?
  //compare(randomPic, savedPic);
};




// //compare images accuracy
function compare(randomPic, savedPic) {

  let x = 0;

  //loop through picToCopy
  for (let obj in randomPic) {
    //find obj in createdGrid through id
    const foundObj = savedPic.find(({ id }) => id === randomPic[obj].id);

    //if picToCopy color == equivilant cell in createdGrid
    if (randomPic[obj].color === foundObj.color) x++; //add +1 to every equal
  }

  //print in right place later = % accuracy of picture
  //print in id gameInfo
  console.log(
    savedPic[0].name + ' is ' + (x / randomPic.length) * 100 + '% right'
  );
};



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


export { findRandomPic, playBtnAction, compare, inputPressPlay};
