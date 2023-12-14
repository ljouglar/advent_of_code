type LabNode = {
  x: number;
  y: number;
  pipe: string;
}

type LabGrid = Array<Array<LabNode>>;

type LabyrinthType = {
  labGrid: LabGrid;
}

class Labyrinth {
  labGrid: LabGrid;

  constructor(labGrid: LabGrid) {
    this.labGrid = labGrid;
  }

  getPipe(x: number, y: number): string {
    return this.labGrid[y][x].pipe;
  }

  setPipe(x: number, y: number, pipe: string): void {
    this.labGrid[y][x].pipe = pipe;
  }

  getNeighbours(x: number, y: number): Array<LabNode> {
    const neighbours: Array<LabNode> = [];
    if (this.labGrid[y - 1] && this.labGrid[y - 1][x]) {
      neighbours.push(this.labGrid[y - 1][x]);
    }
    if (this.labGrid[y + 1] && this.labGrid[y + 1][x]) {
      neighbours.push(this.labGrid[y + 1][x]);
    }
    if (this.labGrid[y][x - 1]) {
      neighbours.push(this.labGrid[y][x - 1]);
    }
    if (this.labGrid[y][x + 1]) {
      neighbours.push(this.labGrid[y][x + 1]);
    }
    return neighbours;
  }

  getNeighboursByPipe(x: number, y: number, pipe: string): Array<LabNode> {
    return this.getNeighbours(x, y).filter((node) => node.pipe === pipe);
  }

  getNeighboursByPipes(x: number, y: number, pipes: Array<string>): Array<LabNode> {
    return this.getNeighbours(x, y).filter((node) => pipes.includes(node.pipe));
  }
  
}

