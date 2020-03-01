// import { isThrowStatement, EndOfLineState } from "typescript"
// import React from "react";


export function Dijsktra(grid,startNode,endNode) {

    startNode.distance = 0;
    const visitedNodeInOrder = [];
    const unvistedNode = GetAllnodes(grid);
    console.log(unvistedNode);
    
    while(!!unvistedNode.length){
     
        sortNodesBydistance(unvistedNode);
        const closetNode = unvistedNode.shift();
        if (closetNode.isWall) continue;

        if(closetNode.distance === Infinity) {
            return visitedNodeInOrder;
        }

        closetNode.isvisited = true;

        visitedNodeInOrder.push(closetNode);

        if (closetNode === endNode) {
            return visitedNodeInOrder;            
        }
        UpdateUnvisitedNeighbors(closetNode,grid)
    }


}

function getUnvisitedNeighbors(closetNode,grid) {
    var unvisitedNeighbors = [];
    const {col,row} = closetNode;
    if (row > 0) unvisitedNeighbors.push(grid[row-1][col]);

    if (row < grid.length - 1) unvisitedNeighbors.push(grid[row+1][col]);

    if (col > 0) unvisitedNeighbors.push(grid[row][col-1]);

    if (col < grid[0].length - 1) unvisitedNeighbors.push(grid[row][col+1]);
    return unvisitedNeighbors.filter(function (neighbor){
        return !neighbor.isvisited;
    });
}


function UpdateUnvisitedNeighbors(node,grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousnode = node;
  }
    
}


function sortNodesBydistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}


function GetAllnodes(grid) {

    const nodes = [];
    for (const row of grid) {
        
        for(const node of row) {
            nodes.push(node);
        }
    }

return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousnode;
    }
    return nodesInShortestPathOrder;
  }
