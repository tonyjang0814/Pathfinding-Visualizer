// export function GreedyBFS(grid,startNode,endNode) {
//     console.log(`col: ${endNode.col}`);
//     console.log(endNode.row);
//     endNode.heuristic = -Infinity;
//     var openList = [];
    
//     var visitedNodeInOrder = [];

//     // push the start pos into the queue
//     openList.push(startNode);

//     // while the queue is not empty
//     while (!!openList.length) {
        
//         var node = openList.shift();
//         node.isVisited = true;
    
         
//         visitedNodeInOrder.push(node);

//         if (node.col == endNode.col && node.row == endNode.row) {
//             return visitedNodeInOrder;
//         }
        
//         let neighbors = getNeighbors(node,grid);
//         GetHeuristic(neighbors,endNode);

//         var sortedArray = leastHeuristic(neighbors);

//         for (let i = 0; i < sortedArray.length; ++i) {
//             var neighbor = sortedArray[i];
//             openList.push(neighbor);
//             neighbor.previousnode = node;

//         }
//     }
//     // fail to find the path
//     return [];
// }


// function getNeighbors(currentNode,grid){
//         var neighbor = [];
//         const {col,row} = currentNode;
    
//         if (row > 0) neighbor.push(grid[row-1][col]);
    
//         if (row < grid.length - 1) neighbor.push(grid[row+1][col]);
    
//         if (col > 0) neighbor.push(grid[row][col-1]);
    
//         if (col < grid[0].length - 1) neighbor.push(grid[row][col+1]);
    
//         return neighbor.filter(function (neigh){
//             return (!neigh.isVisited && !neigh.isWall);
//         });
    
// }

// // function GetHeuristic(neighbors,endNode) {
// //     for (let i = 0; i < neighbors.length; i++) {
// //         var dx = neighbors[i].col - endNode.col;
// //         var dy = neighbors[i].row - endNode.row;
// //         var manhattDidstance = Math.abs(dx) + Math.abs(dy);
// //         neighbors[i].heuristic = manhattDidstance;
// //     }
    
// //     // endNode.heuristic = Infinity;
// // }

// function GetHeuristic(neighbors,endNode) {
//     for (let i = 0; i < neighbors.length; i++) {
//         var dx = neighbors[i].col - endNode.col;
//         var dy = neighbors[i].row - endNode.row;
//         var manhattDidstance = Math.sqrt((dx*dx) + (dy*dy));
//         var manTwoDecimal = manhattDidstance.toFixed(2);
        
//         neighbors[i].heuristic = manTwoDecimal;
        
//     }
// }

// function leastHeuristic(neighbors) {

//     neighbors.sort((nodeA, nodeB) => nodeA.heuristic - nodeB.heuristic);
//     var sortedArray = [];
    
//     //method 1.
//     var pin = neighbors[0].heuristic;
//     for (let i = 0; i < neighbors.length; i++) {
//         if (neighbors[i].heuristic === pin) {
//             var temp = neighbors[i];
//             sortedArray.push(temp);
//         }
//     }
//     return sortedArray;

// }

export function GreedyBFS(grid,startNode,endNode) {
    console.log(`col: ${endNode.col}`);
    console.log(endNode.row);
    endNode.heuristic = -Infinity;
    var openList = [];
    
    var visitedNodeInOrder = [];

    // push the start pos into the queue
    openList.push(startNode);

    // while the queue is not empty
    while (!!openList.length) {
        
        var node = openList.shift();
        node.isVisited = true;
    
         
        visitedNodeInOrder.push(node);

        if (node.col == endNode.col && node.row == endNode.row) {
            return visitedNodeInOrder;
        }
        
        let neighbors = getNeighbors(visitedNodeInOrder,grid);
        GetHeuristic(neighbors,endNode);

        var sortedNode = leastHeuristic(neighbors);

        sortedNode.previousnode = node;
        openList.push(sortedNode);
        
        // for (let i = 0; i < sortedNode.length; ++i) {
        //     var neighbor = sortedNode[i];
        //     openList.push(neighbor);
        //     neighbor.previousnode = node;

        // }
    }
    // fail to find the path
    return [];
}


function getNeighbors(visitedNodeInOrder,grid){

    var neighbor = [];
    for (let i = 0; i < visitedNodeInOrder.length; i++) {
        const {col,row} = visitedNodeInOrder[i];
        
        if (row > 0) neighbor.push(grid[row-1][col]);
    
        if (row < grid.length - 1) neighbor.push(grid[row+1][col]);
    
        if (col > 0) neighbor.push(grid[row][col-1]);
    
        if (col < grid[0].length - 1) neighbor.push(grid[row][col+1]);
    }

    return neighbor.filter(function (neigh){
        return (!neigh.isVisited && !neigh.isWall);
    });
    
}

// function GetHeuristic(neighbors,endNode) {
//     for (let i = 0; i < neighbors.length; i++) {
//         var dx = neighbors[i].col - endNode.col;
//         var dy = neighbors[i].row - endNode.row;
//         var manhattDidstance = Math.abs(dx) + Math.abs(dy);
//         neighbors[i].heuristic = manhattDidstance;
//     }
    
//     // endNode.heuristic = Infinity;
// }

function GetHeuristic(neighbors,endNode) {
    for (let i = 0; i < neighbors.length; i++) {
        var dx = neighbors[i].col - endNode.col;
        var dy = neighbors[i].row - endNode.row;
        var manhattDidstance = Math.sqrt((dx*dx) + (dy*dy));
        var manTwoDecimal = manhattDidstance.toFixed(2);
        
        neighbors[i].heuristic = manTwoDecimal;
        
    }
}

function leastHeuristic(neighbors) {

    neighbors.sort((nodeA, nodeB) => nodeA.heuristic - nodeB.heuristic);
    
    
    //method 1.
    // var sortedArray = [];
    // var pin = neighbors[0].heuristic;
    // for (let i = 0; i < neighbors.length; i++) {
    //     if (neighbors[i].heuristic === pin) {
    //         var temp = neighbors[i];
    //         sortedArray.push(temp);
    //     }
    // }
    // return sortedArray;

    //method2.
    var node = neighbors[0];
    
    return node;
}
