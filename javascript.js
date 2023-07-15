const container = document.querySelector('#container');

/* Dimension */
let squareDimension = 16;
const dimensionButton = document.querySelector('dimension');

// Prompt the user for a dimension; if the user enters a num within the range, save it to squareDimension and update the grid
function promptDimension() {
    let userDimension = -1;
    while(userDimension < 0 || userDimension > 100 || userDimension === "" || isNaN(userDimension)) {
        userDimension = prompt("Enter the number of squares you want per side for the new grid.\nRange: 1-100 squares per side.\nNote: This will delete the existing grid and create a new grid. ");
    }
    if (userDimension !== null) {
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

/* What I could do is do one where I create the default
 * Then I call or add a string when I'm calling the function
 * or i create a separate function and call the default */
function updateColor(newColor) {
    removeEventListeners();
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', setNewColor);
        elem.myParam = newColor;
    });
}

    function setNewColor(event) {
        this.style.backgroundColor = event.currentTarget.myParam;
    }

// Base it solely on the user's color pen, but by default it's #202020, I can add a button to reset the color of the pen
function getUserColor() {
    return document.getElementById('userColor').value;
}

function setDefaultUserColor() {
    return document.getElementById('userColor').value = '#202020';
}

// Random color
function randomColor() {
    removeEventListeners();
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', setRandomColor);
    });
}

    function setRandomColor() {
        let ranColor = 'rgb(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
        this.style.backgroundColor = ranColor;
    }

// Create a variable and subtract it from the light -10% everytime
function darkenColor() {
    removeEventListeners();
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', setDarkenedColor);
        elem.myParam = true;
    });
}

    function setDarkenedColor(event) {
        // Save the current color of a single div
        let currColor = this.style.backgroundColor;
        // if the current color is empty, that means it's the background
        if(currColor === '') {
            currColor = 'rgb(226, 226, 226)';
        }

        // Split the current color into an rgb array (feed into hsl)
        let rgbArr = currColor.slice(4, currColor.length-1).split(', ');

        let hslArr = rgbToHsl(rgbArr[0], rgbArr[1], rgbArr[2]);
        
        if(event.target.myParam === true) {
            // Darken the luminance by 10%
            hslArr[2] -= .10;
        } else {
            // Brighten the luminance by 10%;
            hslArr[2] += .10;
        }

        // Feed the hsl values back into rgb
        let newRgbArr = hslToRgb(hslArr[0], hslArr[1], hslArr[2]);

        let luminanceColor = 'rgb(' + newRgbArr[0] + ', ' + newRgbArr[1] + ', ' + newRgbArr[2] + ')';
        this.style.backgroundColor = luminanceColor;
    }

function brightenColor() {
    removeEventListeners();
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.addEventListener('mouseover', setDarkenedColor);
        elem.myParam = false;
    });
}

// Turn RGB to HSL
/* Theory behind RGB to HSL conversion and vice versa: https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/ */
function rgbToHsl(r, g, b) {
    // Store the HSL r,g,b values in an array respectively
    let rgbArr = [r/255, g/255, b/255];

    let min = rgbArr[0];
    let max = rgbArr[0];

    // Find the minimum and maximum values in the array
    for(let i = 0; i < rgbArr.length; i++) {
        if (rgbArr[i] < min) {
            min = rgbArr[i];
        }
        if (rgbArr[i] > max) {
            max = rgbArr[i];
        }
    }

    // Calculate Luminance
    let luminance = (min + max) / 2;

    let saturation;
    let hue;

    // Calculate Saturation
    // If min and max are 0, there is no saturation and no hue
    if (min === max) {
        saturation = 0;
        hue = 0;
    } else { // min !== max
        // If luminance is less than or equal to 0.5 use the first formula, else use the second formula
        if (luminance <= 0.5) {
            saturation = (max - min) / (max + min);
        } else {
            saturation = (max - min) / (2.0 - max + min);
        }
    }

    let red = rgbArr[0];
    let green = rgbArr[1];
    let blue = rgbArr[2];

    // Calculate Hue
    if (red === max) {
        hue = (green - blue) / (max - min);
    } else if (green === max) {
        hue = (blue - red) / (max - min) + 2.0;
    } else { // blue is max
        hue = (red - green) / (max - min) + 4.0;
    }

    // multiply by 60 to convert it to degrees on the color circle
    hue *= 60;

    // if hue is negative, add 360 (circle has 360 degrees)
    if (hue < 0) { 
        hue += 360;
    }

    let hslArr = [hue, saturation, luminance];
    return hslArr;
}

// Turn HSL to RGB
function hslToRgb(h, s, l) {
    if (s === 0) {
        let value = l * 255;
        return [value, value, value];
    }

    let temp1;
    let temp2;

    // 2 formulas based on luminance < 0.5 or >= 0.5
    if (l < 0.5) {
        temp1 = l * (1.0 + s);
    } else {
        temp1 = l + s - l * s;
    }

    temp2 = 2 * l - temp1;

    h = h/360;

    let tempR = h + 0.333;
    let tempG = h;
    let tempB = h - 0.333;

    let tempRgbArr = [tempR, tempG, tempB];

    // Negative temp r, g, b values need to add 1 to it
    // Greater than 1 temp r, g, b values need to subtract from it
    for(let i = 0; i < tempRgbArr.length; i++) {
        if (tempRgbArr[i] < 0) {
            tempRgbArr[i] += 1;
        } else if (tempRgbArr[i] > 1) {
            tempRgbArr[i] -= 1;
        }
    }

    tempR = tempRgbArr[0];
    tempG = tempRgbArr[1];
    tempB = tempRgbArr[2];

    let red = testTempColors(tempR, temp1, temp2);
    let green = testTempColors(tempG, temp1, temp2);
    let blue = testTempColors(tempB, temp1, temp2);

    let rgbArr = [red, green, blue];
    return rgbArr;
}

// Tests the 3 temporary color channels before multiplying by 255 to get the r, g, b color value
function testTempColors(tempColor, temp1, temp2) {
    let color;
    if (6 * tempColor < 1) {
        color = temp2 + (temp1 - temp2) * 6 * tempColor;
    } else if (2 * tempColor < 1) {
        color = temp1;
    } else if (3 * tempColor < 2) {
        color = temp2 + (temp1 - temp2) * (0.666 - tempColor) * 6;
    } else {
        color = temp2;
    }

    color *= 255;
    return color;
}

// Clear the grid
function clearGrid() {
    if (confirm("Are you sure you want to clear the grid? This action cannot be undone.")) {
        reset();
    }
}

function reset() {
    removeEventListeners();
    deleteDivs();
    createSomeDivs();
    updateColor(getUserColor());
    cuttingCorners();
}

// Toggle the grid
function toggleGrid() {
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.classList.toggle('gridToggle');
    })
}

// Round corners
function cuttingCorners() {
        const container = document.getElementById('container');

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

function removeEventListeners() {
    const allDiv = document.querySelectorAll('.squareDivs');
    allDiv.forEach(function(elem) {
        elem.removeEventListener('mouseover', setNewColor);
        elem.removeEventListener('mouseover', setRandomColor);
        elem.removeEventListener('mouseover', setDarkenedColor);
    })
}

// Run when the page is loaded
createSomeDivs();
updateColor(setDefaultUserColor());
cuttingCorners();