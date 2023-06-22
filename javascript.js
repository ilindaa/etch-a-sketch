const container = document.querySelector('#container');

/* Dimension */
let squareDimension = 16;
const dimensionButton = document.querySelector('dimension');

function promptDimension() {
    squareDimension = -1;
    while(squareDimension < 0 || squareDimension > 100) {
        squareDimension = prompt("Enter the number of squares you want per side for the new grid\n(Range: 1-100).\nNote: This will delete the existing grid and create a new grid. ");
    }
    deleteDivs();
    createSomeDivs();
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

        square.addEventListener('mouseover', hoverEffect);
    }
}

function hoverEffect() {
    this.style.backgroundColor = "black";
}

/* Delete the square divs */
function deleteDivs() {
    container.innerHTML = "";
}

// run when page is loaded
createSomeDivs();