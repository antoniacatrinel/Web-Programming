const imageArray = []
const puzzleSize = 3;


// shuffles the puzzle pieces by swapping each one with another random one from the array
function shuffle(puzzlePieces) {
    for (let i = puzzlePieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        let aux = puzzlePieces[i];
        puzzlePieces[i] = puzzlePieces[j];
        puzzlePieces[j] = aux;
    }
}


// creates an image element with the given coordinates, sets its source, class, ID, size, and onclick function
function createImageElement(x, y) {
    const img = new Image();

    img.src = `img/${x}-${y}.jpg`;
    img.className = 'puzzlepiece';
    img.id = x * puzzleSize + y;
    img.width = 266;
    img.height = 191;
    img.onclick = function () {
      imgClick(this);
    };

    return img;
  }


// initializes the puzzle by creating a 3x3 matrix of images by adding the images to the imageArray, 
// shuffling them, and displays the puzzle by calling the showPuzzle() function
function init() {
    for (x = 0; x < puzzleSize; x++) {
        for (y = 0; y < puzzleSize; y++) {
            const img = createImageElement(x, y);
            imageArray.push(img);
        }
    }

    shuffle(imageArray);
    showPuzzle();
}


// displays the shuffled puzzle pieces in the HTML document; also checks if the puzzle is 
// completed and updates the status message accordingly
function showPuzzle() {
    const statusContainer = document.getElementById('status');
    const puzzleContainer = document.getElementById('puzzle');
    puzzleContainer.innerHTML = '';
    let done = true;

    for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].id != i) {
          done = false;
        }

        puzzleContainer.appendChild(imageArray[i]);
      }
    
      if (done) {
        statusContainer.innerHTML = '<p>Well done!</p>';
      } else {
        statusContainer.innerHTML = '';
      }
}


let toSwap = null;
let indexToSwap = null;


// this function is called when a puzzle piece is clicked
// if no piece has been chosen, it stores the clicked image in the toSwap variable and
// creates a copy of it to display in the status message; if another piece is clicked after 
// the first one, it swaps the two pieces in the imageArray, updates the puzzle display, and resets the toSwap variable
function imgClick(img) {
    const statusContainer = document.getElementById('status');

    if (toSwap === null) {
        toSwap = img;
        indexToSwap = imageArray.indexOf(img);
        statusContainer.innerHTML = '<p>Chosen image (click on it to cancel swap):</p>';
        img.style.opacity = 0.5;

        const copy = new Image();
        copy.src = img.src;
        copy.width = img.width;
        copy.height = img.height;
        copy.className = img.className;
        copy.onclick = function() {
            statusContainer.innerHTML = '';
            toSwap = null;
            indexToSwap = null;
        } 

        statusContainer.appendChild(copy);
    }
    else {
        toSwap.style.opacity = 1;
        statusContainer.innerHTML = '';
        const index = imageArray.indexOf(img);
        imageArray[indexToSwap] = img;
        imageArray[index] = toSwap;
        showPuzzle();
        toSwap = null;
        indexToSwap = null;
      }
} 
