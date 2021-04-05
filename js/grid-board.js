export class GridBoard {
    static NumberSpaces = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
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
                    square.className = "covered even";
                } else
                {
                    square.className = "covered odd";
                }
                square.addEventListener("contextmenu", e => e.preventDefault());
                square.addEventListener("mousedown", (event) => {
                    event.preventDefault();
                    const square = event.target;
                    const button = (event.button === 0) ? 'left' : ((event.button === 2) ? 'right' : 'none');
                    if (this._clickFunction) {
                        this._clickFunction(Number(square.dataset.x), Number(square.dataset.y), button);
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

    changeToNumber(x, y, numb) {
        const square = this._squares[x + (y * this._size)];
        square.classList.remove("covered");
        square.classList.add(GridBoard.NumberSpaces[numb]);
    }

    toggleFlag(x, y) {
        const square = this._squares[x + (y * this._size)];
        square.classList.toggle("flag");
    }

    // method for establishing what function to execute when a space is clicked on. The
    // function should accept two parameters: (x,y), corresponding to the space clicked
    setClickFunction(clickFunc) {
        this._clickFunction = clickFunc;
        console.info(`clickFunction set`);
    }
}
