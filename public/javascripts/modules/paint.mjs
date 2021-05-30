const socket = io();
let grid = [];

// get foundCell with new color from server and print
socket.on('paintedCell', (foundCell) => {
  //find element with same id as foundCell and change bg-color
  document.getElementById(foundCell.id).style.backgroundColor = foundCell.color;
});

//genereate a grid structure
function createGrid(canvasGrid, gridHeight, gridWidth) {
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
      grid.push({ name: '', id: gridCell.id, color: null });
    }
  }
}

//save drawn pic
function saveDrawnPic(input) {

  // give grid array data
  for (let cell in grid) {
    let element = document.getElementById(grid[cell].id);
    grid[cell].color = element.style.backgroundColor;
    grid[cell].name = input.value;
  }

  //send grid to server =>  allDrawnPics.json
  fetch('http://localhost:3000/pic', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(grid),
  });

  //clear input field
  input.value = '';
}

//se saved images
function printSavedPics(target) {
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
      //click on chosen pic
      printList.addEventListener('click', ({ target }) => {
        let clickedPic = target.id;
        //get index for array
        let index = allDrawnPics.findIndex(
          (allDrawnPics) => allDrawnPics[0].name === clickedPic
        );

        //find array to print by index
        let printArray = allDrawnPics[index];

        //give input value of picture name
        document.getElementById('saveArray').value =
          allDrawnPics[index][0].name;

        //send array to server so it can send data back for print
        printArray.forEach((cell) => {
          //send foundCell with new color to server
          socket.emit('paint', cell);
        });
      });
    });
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

    let foundCell = { name: '', id: target.id, color: color };

    //send foundCell with new color to server
    socket.emit('paint', foundCell);
  }
}

// Reset canvas for everyone
socket.on('reset', () => {

  let paintingCanvas = document.getElementById('canvas');
  let gridCells = paintingCanvas.getElementsByTagName('td');

  let item;

  // set every gridcells backgroundcolor to null
  for (item of gridCells) {
    item.style.backgroundColor = null;
  }
});

export { createGrid, saveDrawnPic, printSavedPics, downState, colorCell };
