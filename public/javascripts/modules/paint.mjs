import { color } from './user.mjs';
const socket = io();
const printSavedPicsBtn = document.querySelector('#optionsBtn');
const canvasGrid = document.querySelector('#canvas');

//array to store all saved pics
//need this one? allDrawnPics
const allDrawnPics = [];
let savedPic = [];

// get foundCell with new color from server
socket.on('paintedCell', (foundCell) => {
  //find element with same id as foundCell
  let cellElement = document.getElementById(foundCell.id);
  //change elements bg-color
  cellElement.style.backgroundColor = foundCell.color;
});

//genereate a grid structure
function createGrid(canvasGrid, gridHeight, gridWidth) {
  //get savedPic from app.js

  // Creates rows
  for (let row = 1; row <= gridHeight; row++) {
    let gridRow = document.createElement('tr');
    gridRow.id = 'row' + row;
    canvasGrid.appendChild(gridRow);

    //create cells
    for (let cell = 1; cell <= gridWidth; cell++) {
      let gridCell = document.createElement('td');
      gridCell.id = gridRow.id + 'cell' + cell;
      gridRow.appendChild(gridCell);

      //push name, cell id and color to array
      savedPic.push({ name: '', id: gridCell.id, color: null });
    }
  }
}

//save drawn pic
function saveDrawnPic(input) {

    if(input.value !== "") {
        // replace "canvas" in name with input value
        for (let obj in savedPic) {
            let newName = savedPic[obj].name.replace('', input.value);
            savedPic[obj].name = newName;
        }

        //send savedPic to server =>  allDrawnPics.json
        fetch('http://localhost:3000/pic', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedPic),
        });

        //empty savedPic for next time
        savedPic = [];

        //clear input field
        input.value = '';
    }else {
        alert("Please enter a name")
    };

}

//se saved images
function printSavedPics(target) {
  // printSavedPicsBtn.innerHTML = '';
  const printList = document.getElementById('printList');
  printList.innerHTML = '';

  //fetch allDrawnPics from .json
  fetch('http://localhost:3000/pic')
    .then((res) => res.json())
    .then((allDrawnPics) => {
      for (let index in allDrawnPics) {
        printList.insertAdjacentHTML(
          'beforeend',
          `
            <li class="listItems" id="${allDrawnPics[index][0].name}">${allDrawnPics[index][0].name}</li>`
        );
      }

      printList.addEventListener('click', (evt) => {
        let clickedPic = evt.target.id;
        
        console.log(clickedPic);

        let index = allDrawnPics.findIndex(
          (allDrawnPics) => allDrawnPics[0].name === clickedPic
        );
        console.log(index);

        //find array to print by index
        let printArray = allDrawnPics[index];

        //give input value of picture name
        document.getElementById("saveArray").value = allDrawnPics[index][0].name;

        console.log(printArray);

        printArray.forEach((cell) => {
          //send foundCell with new color to server
          console.log(cell);
          socket.emit('paint', cell);
        });
       
        // printImage(canvasGrid, printArray, 2, 2);
      });
    });
}

//print selected image/facit
function printImage(canvasGrid, drawnPic, gridHeight, gridWidth) {
  canvasGrid.innerHTML = '';

  // creates rows
  for (let row = 1; row <= gridHeight; row++) {
    let gridRow = document.createElement('tr');
    gridRow.id = 'row' + row;
    gridRow.name = drawnPic[0].name;
    canvasGrid.appendChild(gridRow);

    //create cells
    for (let cell = 1; cell <= gridWidth; cell++) {
      let gridCell = document.createElement('td');
      gridCell.id = gridRow.id + 'cell' + cell;
      gridRow.appendChild(gridCell);

      //find saved pics background color
      const foundCell = drawnPic.find(({ id }) => id === gridCell.id);

      //apply color to new grid cell
      gridCell.style.backgroundColor = foundCell.color;
    }
  }
}

///////////////////// MOUSE BEHAVIOUR ///////////////////
//declare down as false before mousedown so mouseover does not pain
let down = false;

// change state of "down" on mouse actions
function downState(target, color) {
  //after mousedown => down == true so mouseover does pain
  down = true;

  //mouseup => down = false
  canvas.addEventListener('mouseup', () => (down = false));

  //if mouse down and leaving grid => down = false
  canvas.addEventListener('mouseleave', () => (down = false));

  //colorCell on mousedown
  colorCell(target, color);
}

//to color cell
function colorCell(target, color) {
  //if down is true
  if (down && target.id !== 'canvas') {
    //find cell and change color in array;
    let foundCell = savedPic.find((i) => i.id === target.id);
    foundCell.color = color;

    //send foundCell with new color to server
    socket.emit('paint', foundCell);
  }
}

export {
  createGrid,
  saveDrawnPic,
  printSavedPics,
  printImage,
  downState,
  colorCell,
  savedPic
};
