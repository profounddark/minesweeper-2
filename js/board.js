export class GridBoard {
    constructor(parent, size) {
        
        this._size = size;
        parent.innerHTML ='';

        this._buildBoard(parent);
        
        console.log(this._gameBoard);
    }

    _buildBoard(parent) {
        
        let board = document.createElement("div");
        board.className = "grid-board";

        for (let row = 1; row <= this._size; row++) {
            for (let col = 1; col <= this._size; col++) {
                let square = document.createElement("div");
                square.dataset.x = col;
                square.dataset.y = row;
                if ((row + col) % 2 === 0) {
                    square.className = "grass even";
                } else
                {
                    square.className = "grass odd";
                }
                board.addEventListener("click", this._turnToDirt);
                board.appendChild(square);
            }
        }
        parent.appendChild(board);
        this._gameBoard = board;
    }

    _turnToDirt(event) {
        const square = event.target;
        square.classList.remove("grass");
        square.classList.add("dirt");
        console.log(`You clicked square ${square.dataset.x}, ${square.dataset.y}`);
    }
}
