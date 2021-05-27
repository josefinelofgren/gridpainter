import { username, color } from './user.mjs';
import { randomPics } from '../modules/array.mjs';
<<<<<<< HEAD
import { printImage, saveDrawnPic, savedPic } from '../modules/paint.mjs';
=======
import { printImage, savedPic, saveDrawnPic } from '../modules/paint.mjs';
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62

const socket = io();
const facitGrid = document.querySelector('#facit');

<<<<<<< HEAD
//print players that are in the game
socket.on('printPlayers', players => {

  document.getElementById("printPlayers").innerHTML = "";

  for (let player in players) {
    document.getElementById("printPlayers").insertAdjacentHTML("beforeend", `<li>${players[player]}</li>`);
  };
  
=======
// socket.on('players', players => {
// console.log('players', players);

// });

//print players that are in the game
socket.on('printPlayers', (players) => {
  const printPlayers = document.getElementById('usersReadyToPlay');
  printPlayers.innerHTML = '';

  for (let player in players) {
    printPlayers.insertAdjacentHTML('beforeend', `<li>${players[player]}</li>`);
  }
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62
});


//find random pic function
function findRandomPic(randomPics, facit) {
  let index = Math.floor(Math.random() * 5); //generate random number 0-4
  facit = [...randomPics[index]]; //user random number as index

<<<<<<< HEAD
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
=======
  return facit;
}

//wait for all players to join game
function awaitPlayers(target) {
  if (target.id === 'playBtn') {
    socket.emit('gameAwait', username);

    target.style.display = 'none';
    target.parentNode.insertAdjacentHTML(
      'afterbegin',
      `<button class="canvas-btn" id="stopBtn">Stop</button>`
    );

    socket.on('beginGame', (players) => {
      if (players.length === 4) {
        runTimer();
        socket.emit('getFacitPic', username);

        socket.on('printFacit', (picture) => {
          document.getElementById('waitingForPlayers').innerHTML = null;
          const facitGrid = document.getElementById('facit');
          printImage(facitGrid, picture, 25, 25);
        });
      } else {
        inputPressPlay();
      }
    });
  }
}

//playBtn => start or stop game
function runTimer(picture) {
  let randomPic = picture;

  const timer = document.getElementById('timer');
  let counter = 60;
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62

  // //find random image to copy
  // let randomPic = findRandomPic(randomPics, facit);
  // printImage(facitGrid, randomPic, 25, 25);

  //start timer
  const setTimer = setInterval(function () {
    counter--;

    timer.innerHTML = `00:00:${counter}`;

    //when < 10 sec show "0" before sec
    if (counter < 10) timer.innerHTML = `00:00:0${counter}`;

    //runt endTimer when time is up
    if (counter < 0) {
      socket.emit('timeUp', username);
      timer.innerHTML = `00:01:00`;
    }

    //run endTimer on click "Stop"
    document.getElementById('stopBtn').addEventListener('click', () => {
      document.getElementById('stopBtn').style.display = 'none';
      document.getElementById('playBtn').style.display = 'block';

      socket.emit('playerLeaving', username);
    });
  }, 1000);

  //end game on timeup or all click on stop
  socket.on('leaveGame', (players) => {
    clearInterval(setTimer);

    //BUG!! PRINTING RESULT A MILLION TIMES
    compare(randomPic, savedPic);

    console.log(randomPic);
  });
}

function compare(randomPic, savedPic) {
  let x = 0;

  //loop through picToCopy
  for (let obj in randomPic) {
    //find obj in createdGrid through id
    const foundObj = savedPic.find(({ id }) => id === randomPic[obj].id);

    //if picToCopy color == equivilant cell in createdGrid
    if (randomPic[obj].color === foundObj.color) x++; //add +1 to every equal
  }

<<<<<<< HEAD
  //print in right place later = % accuracy of picture
  //print in id gameInfo


  document.getElementById("timer").insertAdjacentHTML("afterend", `
  <span>Your picture is ${x / randomPic.length * 100}% correct!</span>`);

};


=======
  document.getElementById('waitingForPlayers').innerText = `Your picture is ${
    (x / randomPic.length) * 100
  }% correct!`;
}
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62

// PLAY GAME
socket.emit('playGame', { username, color });

// MESSAGE FROM SERVER
socket.on('ready', (message) => {
  outputPressPlay(message);
});

// OUTPUT USER IF USER PRESS PLAY
function outputPressPlay(message) {
  let usersReadyToPlay = document.getElementById('usersReadyToPlay');
  usersReadyToPlay.innerHTML += `<li>${message.text}</li>`;
}

// INPUT USER IF USER PRESS PLAY
function inputPressPlay() {
  // Emit message to server
  socket.emit('play');

  document.getElementById(
    'waitingForPlayers'
  ).innerHTML = `<i class="fa-spin fas fa-spinner"></i>Waiting for the other players..`;
}

<<<<<<< HEAD
export { findRandomPic, awaitPlayers, runTimer, compare, inputPressPlay};
=======
export { findRandomPic, awaitPlayers, runTimer, compare, inputPressPlay };
>>>>>>> f79caf556520c79c388b3755beed38f4be657e62
