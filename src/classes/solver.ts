import Board from "./board";
import SearchNode from "./searchNode"
import { MinHeap } from "min-heap-typed";

class Solver {
    initial: Board
    nodeToBoardMap: Map<SearchNode, Board>;
    // find a solution to the initial board (using the A* algorithm)
    constructor(initial: Board) {
        // YOUR CODE HERE
        this.initial = initial
        this.nodeToBoardMap = new Map<SearchNode, Board>();
    }

    // is the initial board solvable? (see below)
    isSolvable(): boolean {
        // Calculate the inversion count
        let invCount = this.getInvCount();
        // Return true if the inversion count is even
        return (invCount % 2 === 0);
    }

    getInvCount(): number {
        let invCount = 0;
        for (let i = 0; i < this.initial.size; i++) {
            for (let j = i + 1; j < this.initial.size; j++) {
                for (let k = j + 1; k < this.initial.size; k++) {
                    if (this.initial.tiles[i][j] > 0 && this.initial.tiles[i][j] > this.initial.tiles[i][k]) {
                        invCount++;
                    }
                }
            }
        }
        return invCount;
    }

    //implement isSolvable criteria, and moves method

    // min number of moves to solve initial board; -1 if unsolvable
    moves(): number {
        const solution = this.solution();
        if (solution.length > 0) {
            return solution.length - 1;
        } else {
            return -1;
        }
    }

    
    
    // sequence of boards in a shortest solution; null if unsolvable
    solution(): Board[] {
        const priorityQueue = new MinHeap<SearchNode>([], {
            comparator: (a, b) => 
            a.manhattanPriority() - b.manhattanPriority()});
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
        return [];
    }    
}
export default Solver;