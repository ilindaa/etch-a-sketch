const container = document.querySelector('#container');

/* Dimension */
let squareDimension = 16;
const dimensionButton = document.querySelector('dimension');

// prompt the user for a dimension; if the user enters a num within the range, save it to squareDimension and update the grid
function promptDimension() {
    let userDimension = -1;
    while(userDimension < 0 || userDimension > 100 || userDimension === "") {
        userDimension = prompt("Enter the number of squares you want per side for the new grid.\nRange: 1-100 squares per side.\nNote: This will delete the existing grid and create a new grid. ");
    }
    if(userDimension !== null) {
        squareDimension = userDimension;
        reset();
    }
}

/* Delete the square divs */
function deleteDivs() {
    container.innerHTML = "";
}

/* Create the square divs */
function createSomeDivs() {
    let row = document.createElement('div');
    row.classList.add("divRow");

    let squareHeightWidth = container.clientHeight/squareDimension;

    for(let i = 0; i < squareDimension; i++) {
        let square = document.createElement('div');

        square.classList.add('squareDivs');
        square.classList.add('gridToggle');
        square.style.height = `${squareHeightWidth}px`;
        square.style.width = `${squareHeightWidth}px`;

        row.appendChild(square);
    }

    for(let i = 0; i < squareDimension; i++) {
        container.appendChild(row.cloneNode(true));
    }
}

// what i could do is do one where i create the default
// then i call or add a string when im calling the function
// or i create a separate function and call the default
function updateColor(newColor) {
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', function() {
            this.style.backgroundColor = newColor;
        });
    });
}

// what i could do is base it solely on the user's color pen, but by default it's #202020, i can add a button to reset the color of the pen
function getUserColor() {
    return document.getElementById('userColor').value;
}

function setDefaultUserColor() {
    return document.getElementById('userColor').value = '#202020';
}

// random color
function randomColor() {
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', function() {
            let ranColor = 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
            this.style.backgroundColor = ranColor;
        });
    });
}

/* 
function darkenColor() {
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', function() {
            let currColor = elem.style.backgroundColor;
            console.log(currColor);
            let rgbArr = currColor.slice(4, currColor.length-1).split(', ');
            let rDiff = rgbArr[0]/10;
            let gDiff = rgbArr[1]/10;
            let bDiff = rgbArr[2]/10;

            rgbArr[0] -= rDiff;
            rgbArr[1] -= gDiff;
            rgbArr[2] -= bDiff;

            let rgbDiff = 'rgb(' + rgbArr[0] + ', ' + rgbArr[1] + ', ' + rgbArr[2] + ')'
            this.style.backgroundColor = rgbDiff;
        });
    });
} */

// clear the grid
function reset() {
    deleteDivs();
    createSomeDivs();
    updateColor(getUserColor());
    cuttingCorners();
}

// toggle the grid
function toggleGrid() {
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.classList.toggle('gridToggle');
    })
}

// round corners
function cuttingCorners() {
        const container = document.getElementById('container');
        console.log(container);
        const firstRow = container.firstChild;
        const lastRow = container.lastChild;

        const topLeft = firstRow.firstChild;
        const topRight = firstRow.lastChild;
        const botLeft = lastRow.firstChild;
        const botRight = lastRow.lastChild;
    
    topLeft.style.borderTopLeftRadius = '10px';
    topRight.style.borderTopRightRadius = '10px';
    botLeft.style.borderBottomLeftRadius = '10px';
    botRight.style.borderBottomRightRadius = '10px';
}

// run when page is loaded
createSomeDivs();
updateColor(setDefaultUserColor());
cuttingCorners();