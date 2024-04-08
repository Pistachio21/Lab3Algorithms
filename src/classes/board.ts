class Board {
    tiles: number[][]
    size: number
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    constructor(tiles: number[][]) {
        // YOUR CODE HERE
        this.tiles = tiles
        this.size = this.tiles.length
    }

    // board representation of this board
    toStrings(): string {
        return this.tiles.map(row => row.join(' ')).join('\n');
    }

    inversionCount() {
        let count = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                for (let k = j + 1; k < this.size; k++) {
                    if (this.tiles[i][j] !== 0 && this.tiles[i][k] !== 0 && this.tiles[i][j] > this.tiles[i][k]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    
    // board dimension n
    dimension(): number {
        // PLS MODIFY
        return this.size
    }

    // number of tiles out of place
    hamming(): number {
        let count = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.tiles[i][j] !== i * this.size + j + 1 && this.tiles[i][j] !== 0) {
                    count++;
                }
            }
        }
        return count;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan() {
        let sum = 0;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const currentNumber = this.tiles[i][j];
                if (currentNumber !== 0) {
                    const goalRow = Math.floor((currentNumber - 1) / this.size);
                    const goalCol = (currentNumber - 1) % this.size;
                    const distance = Math.abs(i - goalRow) + Math.abs(j - goalCol);
                    sum += distance;
                }
            }
        }
        return sum;
    }
    


    // is this board the goal board?
    isGoal(): boolean {
        // PLS MODIFY
        return this.hamming() === 0
    }

    // does this board equal y?
    equals(y: Board): boolean {
        // PLS MODIFY
        return this.manhattan() < y.manhattan()
    }

    // all neighboring boards
   // all neighboring boards
neighbors(): Board[] {
    let blankRow = -1;
    let blankCol = -1;
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.tiles[i][j] === 0) {
                blankRow = i;
                blankCol = j;
                break;
            }
        }
        if (blankRow !== -1) break;
    }
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Right, Down, Left, Up
    let neighbors: Board[] = [];

    for (const [dx, dy] of directions) {
        const newRow = blankRow + dx;
        const newCol = blankCol + dy;
        if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size) {
            let newTiles = JSON.parse(JSON.stringify(this.tiles));
            [newTiles[blankRow][blankCol], newTiles[newRow][newCol]] =
                [newTiles[newRow][newCol], newTiles[blankRow][blankCol]];
            neighbors.push(new Board(newTiles));
        }
    }

    return neighbors;
}


    // a board that is obtained by exchanging any pair of tiles
    twin(): Board {
        let newTiles = JSON.parse(JSON.stringify(this.tiles));
        let position1 = -1;
        let position2 = -1;
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size - 1; j++) {
                if (newTiles[i][j] !== 0 && newTiles[i][j + 1] !== 0) {
                    position1 = i;
                    position2 = j;
                    break;
                }
            }
            if (position1 !== -1) break;
        }
        [newTiles[position1][position2], newTiles[position1][position2 + 1]] =
            [newTiles[position1][position2 + 1], newTiles[position1][position2]];
        return new Board(newTiles);
    }
}

export default Board;