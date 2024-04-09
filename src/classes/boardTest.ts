import Board from "./board";
const tiles2 = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
const board2 = new Board(tiles2);
console.log(board2.toStrings());
console.log(board2.dimension())
console.log(board2.hamming());
console.log(board2.manhattan());
console.log(board2.isGoal());
const neighbors = board2.neighbors();
console.log(neighbors[0]);
const twinBoard = board2.twin();
console.log(twinBoard);