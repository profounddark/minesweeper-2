import { GridBoard } from "./grid-board.js";

function clickerFunction(x, y, button) {
    console.log(`you clicked ${x}, ${y} with the ${button} button!`)
    // gameBoard.changeToNumber(x, y, 8);
    gameBoard.toggleFlag(x, y);
}

let gameDiv = document.getElementById('board-container');

let gameBoard = new GridBoard(10);
gameBoard.setClickFunction(clickerFunction);
gameBoard.buildBoard(gameDiv);

