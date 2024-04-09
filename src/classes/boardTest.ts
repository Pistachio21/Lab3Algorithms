import Board from "./board";
const tiles = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
const tiles2 = [[1, 3, 2], [5, 4, 6], [0, 8, 7]]
const board2 = new Board(tiles2)
const board = new Board(tiles);
console.log(board.toStrings());
console.log(board.dimension())
console.log(board.hamming());
console.log(board.manhattan());
console.log(board.isGoal());
console.log(board.equals(board2))
const neighbors = board.neighbors();
for (let i = 0; i < neighbors.length; i++) {
    console.log(neighbors[i])
}
const twinBoard = board.twin();
console.log(twinBoard);