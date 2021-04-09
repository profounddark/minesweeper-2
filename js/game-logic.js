export class Minesweeper {
    constructor(size, mines) {
        this._size = size;
        this._mines = mines;
        this._board = [];

        this._setBoard(size);
        this._addMines(mines);
        this._revealed = 0;

        this._setSpace = null;
    }

    _toLocation(x, y) {
        return (x + y * this._size);
    }

    _setBoard(boardSize) {
        const max = boardSize ** 2;
        for (let i = 0; i < max; i++) {
            this._board[i] = {mine: false, flag: false, revealed: false};
        }
    }

    _addMines(mines) {
        const max = this._size ** 2;
        let minesToAdd = mines;
        while (minesToAdd > 0) {
            let location = Math.floor(Math.random() * max);
            if (this._board[location].mine == false) {
                console.log(`mine added to ${location}`);
                this._board[location].mine = true;
                minesToAdd--;
            }
        }
    }

    isBomb(x, y) {
        // guard against out of bounds.
        if ((x < 0) || (x >= this._size) || (y < 0) || (y >= this._size)) {
            return false;
        }
        return this._board[x + (y * this._size)].mine;
    }

    _countAdjacent(x, y) {
        let adjacentBombs = 0;
        for (let row = y - 1; row <= y + 1; row ++) {
            for (let col = x - 1; col <= x + 1; col++) {
                if (this.isBomb(col, row)) {
                    adjacentBombs++;
                }
            }
        }
        return adjacentBombs;
    }

    revealSpace(x, y) {

    }
/*
    cascadeSpace(x, y) {
        cascade = [{x: x, y: y}];
        completed = [];

        while (casecade.length > 0) {
            let current = cascade.shift();
            for (let row = current.y - 1; row <= current.y + 1; row++) {
                for (let col = current.x - 1; col <= current.x + 1; current++) {
                    if ((y>=0) && (y<this._size) && (x>0) && (x<this._size)) {
                        if (!completed.includes(this._toLocation(col, row))) {
                            cascade.push({x: col, y: row});
                            completed.push(this._toLocation(current.x, current.y));
                        }
                    }
                }
            }
            let adjacentBombs = this.adjacentBombs(current.x, current.y);


        }



    }
    */

    processLeftClick(x, y) {
        const location = this._toLocation(x, y);

        // guard against clicking revealed or flagged
        if ((this._board[location].revealed === true) || (this._board[location].flag === true)) return;  
        
        if (this._board[location].mine === true) {
            this._setSpace(x, y, true, false, 0);
        } else {
            const adjacentBombs = this._countAdjacent(x, y);
            if (adjacentBombs === 0) {
                //cascadeSpace(x, y);
                this._setSpace(x, y, false, false, adjacentBombs);
            } else {
                this._setSpace(x, y, false, false, adjacentBombs);
            }
        }
        this._board[location].revealed = true;
        this._revealed++;
        if (this._revealed + this._mines == this._size**2) {
            console.log("game over");
        }
    }

    toggleFlag(x,y) {
        this._board[location].flag = !this._board[location].flag;
        this._setSpace(x, y, false, true, 0);
    }

    processRightClick(x, y) {
        
        // guard against flagging revealed spaces
        const location = this._toLocation(x, y);
        if (this._board[location].revealed === true) return;

        this.toggleFlag(x, y);
    }

    processSpace(x, y, button) {
        const location = x + (y * this._size);
        
        if (button == "left") {
            this.processLeftClick(x, y);
        }
        if (button == "right") {
            this.processRightClick(x, y);
        }

    }

    // method for toggling spaces on the board
    // function _setSpace(x, y, bomb, flag, number)
    setBoardFunction(setterFunc) {
        this._setSpace = setterFunc;
        console.info("Setter Space Funciton set");
    }
}