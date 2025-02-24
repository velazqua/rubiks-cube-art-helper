var screenHeight = 800,
    screenWidth = 700;
var numCubesHeight = 10,
    numCubesWidth = 10,
    cubeHeight = 3,
    cubeWidth = 3;
var rubiksCubeColors = ['white', 'yellow', 'red', 'blue', 'green', 'orange']; 
var canvasColors = [];
var currentColour = 'red';
var colourPickerWidth = 70;

function setup() {
  createCanvas(screenHeight, screenWidth);

  // Initialize all squares to white.
  for (let i = 0; i < numCubesHeight * cubeHeight; i++) {
    canvasColors[i] = [];
    for (let j = 0; j < numCubesWidth * cubeWidth; j++) {
      canvasColors[i][j] = 'white';
    }
  }
}

function changeCurrentColour(margin, currentColour) {
  let xStart = (margin-colourPickerWidth)/2;
  if (mouseX >= xStart && mouseX <= xStart+colourPickerWidth) {
    for(let i = 0; i < rubiksCubeColors.length; i++) {
      let yStart = margin/2 + i * 100;
      if (mouseY >= yStart && mouseY <= yStart + colourPickerWidth) {
        return rubiksCubeColors[i]; 
      }
    }
    return currentColour;
  } else {
    return currentColour;
  }
}

function changeCubeColour(margin, squareSize) {
  for (let i = 0; i < numCubesHeight * cubeHeight; i++) {
    let yStart = margin/2 + i * squareSize;
    for (let j = 0; j < numCubesWidth * cubeWidth; j++) {
      let xStart = margin + j * squareSize;
      if (mouseX >= xStart && mouseX <= xStart + squareSize && mouseY >= yStart && mouseY <= yStart + squareSize) {
        canvasColors[i][j] = currentColour;
      }
    }
  }
}

function draw() {
  background(220);
  
  // Leave some space for selecting the colour.
  let margin = 150;
  
  // Draw colour pickers.
  for(let i = 0; i < rubiksCubeColors.length; i++) {
    fill(rubiksCubeColors[i]);
    square((margin-colourPickerWidth)/2, margin/2 + i * margin*2/3, colourPickerWidth);
  }
  
  // Determine the size of the squares.
  let squareSize = (min(screenHeight, screenWidth) - margin)/(numCubesHeight * cubeHeight); 
  
  // Change current colour if we click on one of the colour pickers.
  if (mouseIsPressed) {
    currentColour = changeCurrentColour(margin, currentColour);
    changeCubeColour(margin, squareSize);
  }
  
  // Draw all the cubes.
  for (let i = 0; i < numCubesHeight * cubeHeight; i++) {
    for (let j = 0; j < numCubesWidth * cubeWidth; j++) {
      fill(canvasColors[i][j]);
      square(margin + j * squareSize, margin/2 + i * squareSize, squareSize);
    }
  }
  
  // Draw circle that follows the mouse.
  fill(currentColour);
  circle(mouseX, mouseY, squareSize/2);
}