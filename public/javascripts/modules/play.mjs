//find random pic function
function findRandomPic(randomPics, facit) {
  let index = Math.floor(Math.random() * 5); //generate random number 0-5
  facit = [...randomPics[index]]; //user random number as index
  //   printImage(facitGrid, facit, 2, 2);
  return facit;
}

// //compare images accuracy
function compare(drawnPic) {
  let x = 0;

  //Getting the current pixelart id
  let picToCopy = document.querySelector('.painting-canvas').id;
  console.log(picToCopy);

  //loop through picToCopy
  for (let obj in picToCopy) {
    //find obj in createdGrid through id
    const foundObj = drawnPic.find(({ id }) => id === picToCopy[obj].id);

    //if picToCopy color == equivilant cell in createdGrid
    if (picToCopy[obj].color === foundObj.color) x++; //add +1 to every equal
  }

  //print in right place later = % accuracy of picture
  //print in id gameInfo
  console.log(
    drawnPic[0].name + ' is ' + (x / picToCopy.length) * 100 + '% right'
  );
}

//TIMER

// //Running function on time
// let cron = setInterval(() => {

//   timer();
// }, 10);

// function pause() {
//   clearInterval(cron);
// }

// //Running function on time
// function startTimer () {
//    let cron = setInterval(() => {
//     timer(cron);
//   }, 10);
// }

function reset() {
  minute = 1;
  second = 60;
  millisecond = 1000;

  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '01';
  document.getElementById('second').innerText = '00';
}

let minute = 1;
let second = 60;
let millisecond = 1000;

function timer(cron) {
  minute = 0;
  if ((millisecond -= 10) <= 0) {
    millisecond = 1000;
    second--;
  }
  if (second == 0) {
    console.log('Time up');
    clearInterval(cron);
    reset();
  }
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
}

function returnData(input) {
  return input > 9 ? input : `0${input}`;
}

export { findRandomPic, compare, timer };
