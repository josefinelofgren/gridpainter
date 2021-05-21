import { printImage } from '../main.js';

const facitGrid = document.querySelector('#facit');

//find random pic function
function findRandomPic(randomPics, facit) {
  let index = Math.floor(Math.random() * 5); //generate random number 0-5
  facit = [...randomPics[index]]; //user random number as index
  printImage(facitGrid, facit, 2, 2);
}

// //compare images accuracy
// function compare(picToCopy, drawnPic) {
//   let x = 0;

//   //loop through picToCopy
//   for (let obj in picToCopy) {
//     //find obj in createdGrid through id
//     const foundObj = drawnPic.find(({ id }) => id === picToCopy[obj].id);

//     //if picToCopy color == equivilant cell in createdGrid
//     if (picToCopy[obj].color === foundObj.color) x++; //add +1 to every equal
//   }

//   //print in right place later = % accuracy of picture
//   //print in id gameInfo
//   console.log(
//     drawnPic[0].name + ' is ' + (x / picToCopy.length) * 100 + '% right'
//   );
// }

export { findRandomPic, compare };
