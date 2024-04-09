import Board from './board'
class SearchNode {    
    moves: number;
    previousSearchNode: SearchNode | null;
    board: Board
    manhattan: number
    hamming: number

    constructor(moves: number, previousSearchNode: SearchNode | null, 
        board: Board) {
        this.moves = moves;
        this.previousSearchNode = previousSearchNode;
        this.board = board
        this.manhattan = this.moves + this.board.manhattan();
        this.hamming = this.moves + this.board.hamming();
    }

    getBoard() {
        return this.board
    }

    hammingPriority(): number {
        return this.hamming
    }

    manhattanPriority(): number {
        return this.manhattan
    }
}

export default SearchNode