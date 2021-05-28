import { username, color } from './user.mjs';
import { printImage } from '../modules/paint.mjs';

const socket = io();


//print players that are in the game
socket.on('printPlayers', (players) => {
  const printPlayers = document.getElementById('usersReadyToPlay');
  printPlayers.innerHTML = '';

  for (let player in players) {
    printPlayers.insertAdjacentHTML('beforeend', `<li>${players[player]}</li>`);
  };
});


//find random pic function
function findRandomPic(randomPics, facit) {
  let index = Math.floor(Math.random() * 5); //generate random number 0-4
  facit = [...randomPics[index]]; //user random number as index

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
      //if players are 4, begin game
    socket.on('beginGame', (players) => {
      if (players.length === 4) {
        
        //get a random nr for index and send with socket
        let index = Math.floor(Math.random() * 3);
        socket.emit('getFacitPic', (index));
        //get picture arrya back
        socket.on('printFacit', (picture) => {
              
          document.getElementById('waitingForPlayers').innerHTML = null;
         
          const facitGrid = document.getElementById('facit');
          printImage(facitGrid, picture, 25, 25);

          runTimer(picture);
        });   
      } else {
        inputPressPlay();
      };
    });
  };
};


//playBtn => start or stop game
function runTimer(picture) {
  let randomPic = picture;

  const timer = document.getElementById('timer');
  let counter = 60;

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
      //swap play for stop button
      document.getElementById('stopBtn').style.display = 'none';
      document.getElementById('playBtn').style.display = 'block';
      //send user that stopped to socket
      socket.emit('playerLeaving', username);
    });
  }, 1000);

  //end game on timeup or all click on stop
  socket.on('stopGame', (players) => {
  
    clearInterval(setTimer);
    compare(randomPic);
  });
};



function compare(facitPic) {
  let x = 0;
  let canvasPic = [];

  //generate canvasPic from facitPic and with same id and length
  for (let cell in facitPic) {
    canvasPic.push({id: facitPic[cell].id, color: ""})
  };

  //get bg color from canvasGrid and push to canvasPic
  for (let cell in canvasPic) {
    let element = document.getElementById(canvasPic[cell].id);
    canvasPic[cell].color = element.style.backgroundColor;
  };

  //loop through picToCopy
  for (let cell in facitPic) {
    //find obj in createdGrid through id
    const foundObj = canvasPic.find(({ id }) => id === facitPic[cell].id);

    //if picToCopy color == equivilant cell in createdGrid
    if (facitPic[cell].color === foundObj.color) x++; //add +1 to every equal
    if (facitPic[cell].color === null && foundObj.color === "") x++;// color is "" OR null - correct!
  };
  
  //print result
  document.getElementById('waitingForPlayers').innerText = `Your picture is ${
    (x / facitPic.length) * 100
  }% correct!`;
}

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

export { findRandomPic, awaitPlayers, runTimer, compare, inputPressPlay };
