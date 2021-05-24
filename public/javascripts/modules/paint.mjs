import {color} from "./user.mjs";
const socket = io();
const printSavedPicsBtn = document.querySelector('#optionsBtn');
const canvasGrid = document.querySelector('#canvas');


//array to store all saved pics
const allDrawnPics = [];
let savedPic = [];


// get foundCell with new color from server
socket.on('paintedCell', foundCell => {

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
        gridRow.id = "row" + row; 
        canvasGrid.appendChild(gridRow);

        //create cells
        for (let cell = 1; cell <= gridWidth; cell++) {
            
            let gridCell = document.createElement('td');
            gridCell.id = gridRow.id + "cell" + cell;
            gridRow.appendChild(gridCell);

            //push name, cell id and color to array
            savedPic.push({name: "", id: gridCell.id, color: null}); 
           
        };
    };
};


//save drawn pic
function saveDrawnPic(input) {
 
    // replace "canvas" in name with input value
    for (let obj in savedPic) {
        let newName = savedPic[obj].name.replace("", input.value)
        savedPic[obj].name = newName;
    };

    //push or replace to array with all saved 
    //not finished!
    // let checkDoublet = allDrawnPics.findIndex( (arr) => arr[0].name === newName );
    // if (checkDoublet == undefind/-1) {
    //     allDrawnPics.push(savedPic);
    // } else {
    //     allDrawnPics.splice(1, checkDoublet, savedPic)
    // }
    allDrawnPics.push(savedPic);
   
    //empty savedPic for next time 
    savedPic = [];
    
    input.value = "";

};


//se saved images
function printSavedPics(target) {
    
    printSavedPicsBtn.innerHTML = "";

    for (let index in allDrawnPics) {

        printSavedPicsBtn.insertAdjacentHTML("beforeend", `
        <option id="${allDrawnPics[index][0].name}">${allDrawnPics[index][0].name}</option>`);

        //need this if there are more obj in array? :
        
        // for (let pic in allDrawnPics[index]) {
        //     console.log('pic', allDrawnPics[index][pic].name);
        //     printListContainer.insertAdjacentHTML("beforeend", `<li id="${allDrawnPics[index][pic].name}">${allDrawnPics[index][pic].name}</li>`)
        // }
    }; 
    
    //find index of target array in allDrawnPics 
    if(target.id !== "optionsBtn") {
        
        let index = allDrawnPics.findIndex( (arr) => arr[0].name === target.id );

        //find array to print by index
        let printArray = allDrawnPics[index];
        console.log('printArray', printArray);
        //when resave pic make sure to either splice? or push to array (no duplicates!)
        printImage(canvasGrid, printArray, 2, 2);

    };
};        
   




//print selected image/facit 
function printImage(canvasGrid, drawnPic, gridHeight, gridWidth) {

    canvasGrid.innerHTML = "";

    // creates rows 
    for (let row = 1; row <= gridHeight; row++) {
        
        let gridRow = document.createElement('tr');
        gridRow.id = "row" + row; 
        gridRow.name = drawnPic[0].name;
        canvasGrid.appendChild(gridRow);

        //create cells
        for (let cell = 1; cell <= gridWidth; cell++) {
            
            let gridCell = document.createElement('td');
            gridCell.id = gridRow.id + "cell" + cell;
            gridRow.appendChild(gridCell);

            //find saved pics background color 
            const foundCell = drawnPic.find( ({ id }) => id === gridCell.id );

            //apply color to new grid cell
            gridCell.style.backgroundColor = foundCell.color;
        };
    };
};


///////////////////// MOUSE BEHAVIOUR ///////////////////
//declare down as false before mousedown so mouseover does not pain
let down = false;

// change state of "down" on mouse actions
function downState(target, color) { 
 
    //after mousedown => down == true so mouseover does pain
    down = true;

    //mouseup => down = false
    canvas.addEventListener('mouseup', () => down = false);

    //if mouse down and leaving grid => down = false
    canvas.addEventListener('mouseleave', () => down = false);
    
    //colorCell on mousedown
    colorCell(target, color);

};    
 

//to color cell
function colorCell(target, color) {

    //if down is true
    if(down && target.id !== "canvas") {
    
        //find cell and change color in array;
        let foundCell = savedPic.find(i => i.id === target.id)
        foundCell.color = color;

        //send foundCell with new color to server
        socket.emit('paint', foundCell);

    };
    
};




export {createGrid, saveDrawnPic, printSavedPics, printImage, downState, colorCell};