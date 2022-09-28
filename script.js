const grid = document.getElementById('grid');
const gridHeight = grid.clientHeight;
const gridWidth = grid.clientWidth;
let hoversArray = [];

//CHANGE COLORS
grid.addEventListener('mouseover', changeColor);
function changeColor(colorTile) {
    const tiles = document.querySelectorAll('.tile');
    const tilesArray = Array.from(tiles);

    //if condition to block hover if user doesn't click button
    if (document.querySelector('.tile') !== null) {
        tilesArray.forEach((tile) => {
            if (colorTile.target === tile) {
                colorTile.target.style.backgroundColor = randomColors(); 
                let hoverIndex = tilesArray.indexOf(tile);
                hoversArray = hoverCount(hoverIndex);
                colorTile.target.style.filter = `brightness(${1-hoversArray[hoverIndex]/10})`;
            }
        });
    }
}


function hoverCount(hoverIndex) {
    hoversArray[hoverIndex] += 1;
    return hoversArray;
}

//hoverCount();
function initializeHoversArray(arrayLength) {
    hoversArray.length = arrayLength * arrayLength;
    for (let i = 0; i < hoversArray.length; i++) {
        hoversArray[i] = 0;
    }
}

//BUTTON 
const button = document.querySelector('button');
button.addEventListener('click', promptUser);
function promptUser() {
    if (document.querySelector('.tile') === null) {
        makeTiles();
    } else {
        deleteAllTiles();
        grid.style.gridTemplateColumns = 'none';
        grid.style.gridTemplateRows = 'none';
        setTimeout(makeTiles(), 1000);
    }
}

//MAKE GRID
function makeTiles() {
    const i = prompt('Enter a grid size');
    if (i !== null && i !== 'undefined') {
        initializeHoversArray(i); 
    }
    
    grid.style.gridTemplateColumns = `repeat(${i}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${i}, 1fr)`;

    for (let j = 0; j < i * i; j++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.height = gridHeight / i;
        tile.style.width = gridWidth / i;
        grid.appendChild(tile); 
    }
}

//REMOVE CHILDS TILES
function deleteAllTiles () {
    //tiles can't stay global, otherwise function doesn't call it at event
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile) => grid.removeChild(tile));
}

//RANDOMIZE COLORS
function randomColors() {
    const max = 255;
    let i = Math.floor(Math.random() * 255);
    let j = Math.floor(Math.random() * 255);
    let k = Math.floor(Math.random() * 255);
    const randomColor = `rgb(${i}, ${j}, ${k})`;
    return randomColor;
}

//FUN SHIT
grid.addEventListener('mouseenter', gridAnime);
function gridAnime() {
        
    if (document.querySelector('.tile') === null) {
        grid.style.backgroundColor = 'purple';
        grid.style.transition = 'background-color 2000ms';
    }
}

grid.addEventListener('mouseleave', gridAnimeOut);
function gridAnimeOut() {
    if (document.querySelector('.tile') === null) {
        grid.style.backgroundColor = 'pink';
    }
}