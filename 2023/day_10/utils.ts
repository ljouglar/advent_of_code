// A class that handle labyrinth nodes
// Coordinate system: (0,0) is top left corner
// Nodes are stored in a 2D array
// Each node has his own coordinates and a letter that represents its two connections
// Specifically:
//   letter 'L' means that the node has a connection to the right and to the up
//   letter 'F' means that the node has a connection to the right and to the bottom
//   letter 'J' means that the node has a connection to the left and to the up
//   letter '7' means that the node has a connection to the left and to the bottom
//   letter '|' means that the node has a connection to the bottom and to the up
//   letter '-' means that the node has a connection to the left and to the right
class LabNode {
  x: number;
  y: number;
  letter: string;

  constructor(x: number, y: number, letter: string) {
    this.x = x;
    this.y = y;
    this.letter = letter;
  }
}

class Labyrinth {
  nodes: Array<Array<LabNode>>;

  constructor() {
    this.nodes = [];
  }

  
}
