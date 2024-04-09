import Board from "./board";
import SearchNode from "./searchNode"
import { MinHeap } from "min-heap-typed";

class Solver {
    initial: Board
    nodeToBoardMap: Map<SearchNode, Board>;

    // find a solution to the initial board (using the A* algorithm)
    constructor(initial: Board) {
        if (initial === null) {
            throw new Error('Board cannot be null.')
        }
        // YOUR CODE HERE
        this.initial = initial
        this.nodeToBoardMap = new Map<SearchNode, Board>();
    }
    // is the initial board solvable? (see below)
    isSolvable(): boolean {
        const invCount = this.getInvCount(this.initial.tiles);
        return invCount % 2 === 0;
    }
    private getInvCount(tiles: number[][]): number {
        let invCount = 0;
        const size = tiles.length;
    
        // Count inversions in each row
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size - 1; j++) {
                // Treat the blank tile as having a higher number than any other tile
                const tile1 = tiles[i][j] === 0 ? size * size : tiles[i][j];
                const tile2 = tiles[i][j + 1] === 0 ? size * size : tiles[i][j + 1];
                if (tile1 > tile2) {
                    invCount++;
                }
            }
        }
    
        // Count inversions in each column
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size - 1; i++) {
                // Treat the blank tile as having a higher number than any other tile
                const tile1 = tiles[i][j] === 0 ? size * size : tiles[i][j];
                const tile2 = tiles[i + 1][j] === 0 ? size * size : tiles[i + 1][j];
                if (tile1 > tile2) {
                    invCount++;
                }
            }
        }
    
        console.log("Inversion Count:", invCount);
        return invCount;
    }
    
    // min number of moves to solve initial board; -1 if unsolvable
    moves(): number {
        const solution = this.solution();
        if (solution && solution.length > 0) {
            return solution.length;
        } else {
            return -1;
        }
    }

    // sequence of boards in a shortest solution; null if unsolvable
    solution(): Board[] | null {
        const priorityQueue = new MinHeap<SearchNode>([], {
            comparator: (a, b) =>
               {
                if (a.moves !== b.moves) {
                    return a.moves - b.moves;
                  } else if (a.hammingPriority() !== b.hammingPriority()) {
                    return a.hammingPriority() - b.hammingPriority();
                  } else {
                    return a.manhattanPriority() - b.manhattanPriority();
                  }
               }
        });
        const initialSearchNode = new SearchNode(0, null, this.initial);
        priorityQueue.add(initialSearchNode);

        const visited = new Set<string>();

        while (!priorityQueue.isEmpty()) {
            const currentNode = priorityQueue.poll();
            if (!currentNode) {
                throw new Error("Priority queue is empty unexpectedly.");
            }
            const currentBoard = currentNode.getBoard();

            if (currentBoard.isGoal()) {
                const solutionPath: Board[] = [];
                let node: SearchNode | null = currentNode;
                while (node !== null) {
                    solutionPath.unshift(node.getBoard());
                    node = node.previousSearchNode;
                }
                return solutionPath;
            }

            visited.add(currentBoard.toStrings());

            const neighbors = currentBoard.neighbors();
            for (const neighbor of neighbors) {
                const neighborNode = new SearchNode(currentNode.moves + 1, currentNode, neighbor);
                if (!visited.has(neighbor.toStrings())) {
                    priorityQueue.add(neighborNode);
                }
            }
        }
        return null;
    }
}
export default Solver;