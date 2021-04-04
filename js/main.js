import { GridBoard } from "./grid-board.js";

function clickerFunction(x, y) {
    console.log(`you clicked ${x}, ${y}!`)
    gameBoard.turnToDirt(x, y);
}

let gameDiv = document.getElementById('board-container');

let gameBoard = new GridBoard(10);
gameBoard.setClickFunction(clickerFunction);
gameBoard.buildBoard(gameDiv);

