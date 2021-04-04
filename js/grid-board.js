export class GridBoard {
    constructor(size) {
        
        this._size = size;
        this._clickFunction = null;
        this._board = null;
        this._squares=[];

    }

    buildBoard(parent) {        
        let board = document.createElement("div");
        board.className = "grid-board";

        for (let row = 0; row < this._size; row++) {
            for (let col = 0; col < this._size; col++) {
                let square = document.createElement("div");
                square.dataset.x = col;
                square.dataset.y = row;
                if ((row + col) % 2 === 0) {
                    square.className = "grass even";
                } else
                {
                    square.className = "grass odd";
                }
                square.addEventListener("click", (event) => {
                    const square = event.target;
                    if (this._clickFunction) {
                        this._clickFunction(Number(square.dataset.x), Number(square.dataset.y));
                    } else {
                        console.error('No click function set');
                    }
                });
                this._squares[col + this._size*row] = square;
                board.appendChild(square);
            }
        }
        parent.appendChild(board);
        this._gameBoard = board;
    }

    turnToDirt(x, y) {
        const square = this._squares[x + (y * this._size)];
        square.classList.remove("grass");
        square.classList.add("dirt");
    }

    // method for establishing what function to execute when a space is clicked on. The
    // function should accept two parameters: (x,y), corresponding to the space clicked
    setClickFunction(clickFunc) {
        this._clickFunction = clickFunc;
        console.info(`clickFunction set`);
    }
}
