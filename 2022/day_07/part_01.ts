import { readFileSync } from 'fs';

type TreeNode = {
  nodeType: 'dir' | 'file';
  name: string;
  children?: TreeNode[];
  size: number;
  parent: TreeNode | null;
};
const filename = '2022/day_07/input.data';

const extractLines = (): Array<string> => readFileSync(filename, 'utf-8').split('\n');

const rootNode: TreeNode = { nodeType: 'dir', name: '/', children: [], size: 0, parent: null };
let currentNode: TreeNode = undefined;
let destNode: TreeNode = undefined;
for (const line of extractLines()) {
  if (line.match(/^\$ cd/)) {
    const dest = line.split(' ').pop();
    switch (dest) {
      case '/':
        currentNode = rootNode;
        break;
      case '..':
        currentNode = currentNode.parent;
        break;
      default:
        destNode = currentNode.children.find((node: TreeNode) => node.nodeType === 'dir' && node.name === dest);
        if (!destNode) {
          destNode = { nodeType: 'dir', name: dest, children: [], size: 0, parent: currentNode };
          currentNode.children.push(destNode);
        }
        currentNode = destNode;
        break;
    }
  } else if (line.match(/^dir /)) {
    const dest = line.split(' ').pop();
    destNode = currentNode.children.find((node: TreeNode) => node.nodeType === 'dir' && node.name === dest);
    if (!destNode) {
      destNode = { nodeType: 'dir', name: dest, children: [], size: 0, parent: currentNode };
      currentNode.children.push(destNode);
    }
  } else if (line.match(/^\d+ /)) {
    const [size, name] = line.split(' ');
    destNode = currentNode.children.find((node: TreeNode) => node.nodeType === 'file' && node.name === name);
    if (!destNode) {
      destNode = { nodeType: 'file', name, children: [], size: +size, parent: currentNode };
      currentNode.children.push(destNode);
    }
  }
}

const sizesOver100K: Array<number> = [];
const setDirSize = (node: TreeNode, deep: number = 0): number => {
  node.size = node.nodeType === 'dir' ? 0 : node.size;
  console.log(
    '  '.repeat(deep) + ' - ' + node.name + ' (' + node.nodeType + (node.nodeType === 'dir' ? ')' : `, ${node.size})`),
  );
  for (const child of node.children) {
    node.size += setDirSize(child, deep + 1);
  }
  if (node.nodeType === 'dir' && node.size <= 100000) {
    sizesOver100K.push(node.size);
  }
  return node.size;
};

setDirSize(rootNode);

const result = sizesOver100K.reduce((sum, size) => sum + size);

console.log(`result ${result}`);
