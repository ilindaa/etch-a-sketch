const container = document.querySelector('#container');

/* Dimension */
let squareDimension = 16;
const dimensionButton = document.querySelector('dimension');

// prompt the user for a dimension; if the user enters smth within the range, save it to squareDimension and update the grid
function promptDimension() {
    let userDimension = -1;
    while(userDimension < 0 || userDimension > 100 || userDimension === "") {
        userDimension = prompt("Enter the number of squares you want per side for the new grid.\nRange: 1-100 squares per side.\nNote: This will delete the existing grid and create a new grid. ");
    }
    if(userDimension !== null) {
        squareDimension = userDimension;
        deleteDivs();
        createSomeDivs();
    }
}

/* Create the square divs */
function createSomeDivs() {
    let row = document.createElement('div');
    row.classList.add("divRow");

    let squareHeightWidth = container.clientHeight/squareDimension;

    for(let i = 0; i < squareDimension; i++) {
        let square = document.createElement('div');

        square.classList.add('squareDivs');
        square.style.height = `${squareHeightWidth}px`;
        square.style.width = `${squareHeightWidth}px`;

        row.appendChild(square);
    }

    for(let i = 0; i < squareDimension; i++) {
        container.appendChild(row.cloneNode(true));
    }

    /*
        square.addEventListener('mouseover', defaultBlack);
        // square.addEventListener('mouseover', erase)
    */
}

/*
const allDiv = document.querySelectorAll('.squareDivs');
console.log(allDiv);
allDiv.forEach(div, addEL(defaultBlack()));

function addEL(event) {
    this.addEventListener('click', event);
}
*/

// default hover effect
function defaultBlack() {
    this.style.backgroundColor = "#202020";
}

// erase
function erase() {
    this.style.backgroundColor = "#e2e2e2";
}

/* Delete the square divs */
function deleteDivs() {
    container.innerHTML = "";
}

// run when page is loaded
createSomeDivs();