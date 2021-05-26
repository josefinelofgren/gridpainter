import {username, color} from "./user.mjs";
import { randomPics } from '../modules/array.mjs';
import { printImage, saveDrawnPic, savedPic } from '../modules/paint.mjs';

const socket = io();
const facitGrid = document.querySelector('#facit');

//print players that are in the game
socket.on('printPlayers', players => {

  document.getElementById("printPlayers").innerHTML = "";

  for (let player in players) {
    document.getElementById("printPlayers").insertAdjacentHTML("beforeend", `<li>${players[player]}</li>`);
  };
  
});


//find random pic function
function findRandomPic(randomPics, facit) {
  let index = Math.floor(Math.random() * 5); //generate random number 0-5
  facit = [...randomPics[index]]; //user random number as index
  //printImage(facitGrid, facit, 2, 2);
  return facit;
};

//wait for all players to join game
function awaitPlayers(target) {
  
  if(target.id === "playBtn") {
            
    socket.emit('gameAwait', username);

    target.style.display = "none";
    target.parentNode.insertAdjacentHTML("afterbegin", `
    <button id="stopBtn">Stop</button>
    <ul id="printPlayers"></ul>`)
    
    socket.on('beginGame', players => {
    
      console.log('players.length', players.length);
      if(players.length === 4) {
        console.log('player', players);
        runTimer();
        inputPressPlay();
  
      };
  
    });
   
 
  };

};



//playBtn => start or stop game
function runTimer() {

  const timer = document.getElementById("timer");
  let counter = 60;

  //find random image to copy
  let randomPic = findRandomPic(randomPics, facit);
  printImage(facitGrid, randomPic, 2, 2);

  //start timer
  const setTimer = setInterval(function(){
    
    counter--;
    
    timer.innerHTML = `00:00:${counter}`;
    
    //when < 10 sec show "0" before sec
    if(counter < 10) timer.innerHTML = `00:00:0${counter}`;
      
    //runt endTimer when time is up
    if (counter < 0) {

      socket.emit('timeUp', username);
      timer.innerHTML = `00:01:00`;

    };

    //run endTimer on click "Stop"
    document.getElementById("stopBtn").addEventListener("click", () =>  {

      //not really working??  could be conflict with other socket on "waiting for the other players"??
      document.getElementById("stopBtn").style.display = "none"
      document.getElementById("playBtn").style.display = "block";
  
      socket.emit('playerLeaving', username);

    });


  }, 1000);

  //end game on timeup or all click on stop
  socket.on('leaveGame', players => {

    clearInterval(setTimer);
    //compare(randomPic, savedPic);
  
  });

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


  document.getElementById("timer").insertAdjacentHTML("afterend", `
  <span>Your picture is ${x / randomPic.length * 100}% correct!</span>`);

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


export { findRandomPic, awaitPlayers, runTimer, compare, inputPressPlay};
