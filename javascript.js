const container = document.querySelector('#container');

/* Dimension */
let squareDimension = 16;
const dimensionButton = document.querySelector('dimension');

function promptDimension() {
    squareDimension = -1;
    while(squareDimension < 0 || squareDimension > 100 || squareDimension === "") {
        squareDimension = prompt("Enter the number of squares you want per side for the new grid.\nRange: 1-100 squares per side.\nNote: This will delete the existing grid and create a new grid. ");
    }
    if(squareDimension !== null) {
        deleteDivs();
        createSomeDivs();
    }
}

/* Create the square divs */
function createSomeDivs() {
    let total = Math.pow(squareDimension, 2);

    for(let i = 0; i < total; i++) {
        let squareHeightWidth = container.clientHeight/squareDimension;
        let square = document.createElement('div');

        square.classList.add("squareDivs");
        square.style.height = `${squareHeightWidth}px`;
        square.style.width = `${squareHeightWidth}px`;

        container.appendChild(square);

        square.addEventListener('mouseover', defaultBlack);
        // square.addEventListener('mouseover', erase)
    }
}

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