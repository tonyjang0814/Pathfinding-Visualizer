import Node from "./components/Node";
import React, {useState} from "react";
import NodeStyles from "./components/NodeStyles.css";
import {Dijsktra, getNodesInShortestPathOrder} from "./algorithms/Dijsktra";
import WebStyles from "./components/WebStyles.css";
import { GreedyBFS } from "./algorithms/GreedyBFS";

//used for creating inital node only. these will be changed when user drags start/end nodes by useState hooks.
const START_NODE_COL = 10;
const START_NODE_ROW = 10;
const END_NODE_COL = 45;
const END_NODE_ROW = 5;


function Pathfinding (){

  // const grid = [];
  var visitedNode = [];
  var nodesInShortestPathOrder = [];
  const grid = initialGrid();
  // const gridSave = initialGrid();


  const [Grid,setGrid] = useState(grid) // hook
  // const [gridSave,setClearBoard] = useState(Grid);
  var StartNode = Grid[START_NODE_ROW][START_NODE_COL];
  var EndNode = Grid[END_NODE_ROW][END_NODE_COL];


  const [isPressed,setPress] = useState(false)
  const [isStartPressed,setStartPress] = useState(false)
  const [isEndPressed,setEndPress] = useState(false)

  const[startNode,setStartNode] = useState(StartNode)
  const[endNode,setEndNode] = useState(EndNode)

  function handleRunStatus() {
    document.getElementById("dijkstra").disabled = true;
    document.getElementById("greedyBFS").disabled = true;
    setStartPress(false);
    setEndPress(false);
    
    
  }
  
  function handleMouseDown(row, col) {
    if ((col === startNode.col && row === startNode.row)){
      setStartPress(true)
    }else if ((col === endNode.col && row === endNode.row)) {
      setEndPress(true)
    }else{
      setPress(true);
      const newGrid = getNewGridWithWallToggled(Grid, row, col);
      setGrid(newGrid);
    }
  }

  function handleMouseLeave(row,col){
    if (isStartPressed) {
      Grid[row][col].isStart = false;
      
    }else if(isEndPressed){
      Grid[row][col].isFinish = false;
    }
  }

  function handleMouseEnter(row,col) {
    if (isStartPressed) {

      const newGrid= Grid[row][col];
      newGrid.isStart = true;
      setStartNode(newGrid);

 
    }else if (isEndPressed) {
      
      const newGrid = Grid[row][col];
      newGrid.isFinish = true;
      setEndNode(newGrid);
    }
    else if (isPressed) { 
      if (row === startNode.row && col ===startNode.col) {
        return;
      }
      if (row === endNode.row && col ===endNode.col){
        return;
      } 
      const newGrid = getNewGridWithWallToggled(Grid, row, col);
      setGrid(newGrid);  
    }
  }

  function handleMouseUp(row,col) {
    if (isStartPressed) {
      startNode.isWall = false;      
    }
    if (isEndPressed) {
      endNode.isWall = false;      
    }
    setPress(false);
    setStartPress(false);
    setEndPress(false);
  }

  function animateDijkstra(visitedNodes, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 15 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node ${node.row}-${node.col}`).className =
          'node node-visited';
      }, 15 * i);
    }
  }

  function animateBFS(visitedNodes, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node ${node.row}-${node.col}`).className =
          'node node-visited';
      }, 20 * i);
    }
  }


  // function animateBFS(visitedNodes,nodesInShortestPathOrder) {
  //   for (let i = 0; i <= visitedNodes.length - 1; i++) {
  //     if (i === (visitedNode.length)-1) {
  //       console.log("trig");
  //       setTimeout(() => {
  //         animateShortestPath(nodesInShortestPathOrder);
  //       }, 15 * i);
  //       return;
  //     }
  //     setTimeout(() => {
  //       const node = visitedNodes[i];
  //       document.getElementById(`node ${node.row}-${node.col}`).className =
  //         'node node-visited';
  //     }, 50 * i);
  //   }
  // }


  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node ${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 20 * i);
    } 
  }

    function BridgeanimateDijsktra() {
    handleRunStatus();
    visitedNode = Dijsktra(Grid,startNode,endNode);
   
    nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNode, nodesInShortestPathOrder);

    // document.getElementById("dijkstra").disabled = false;
    // document.getElementById("greedyBFS").disabled = true;
    }
    
    function BridgeanimateGreedyBFS() {
      handleRunStatus();
      var visitedNodeInOrder = [];
      visitedNodeInOrder = GreedyBFS(Grid,startNode,endNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);

      console.log(visitedNodeInOrder);
      console.log(nodesInShortestPathOrder);
      animateBFS(visitedNodeInOrder,nodesInShortestPathOrder);
    }

    function Clear() {
      window.location.reload(true);

    }

    return (
      <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand">Pathfinding Visualiser</a>
        
        <div className="collapse navbar-collapse navbarcontents" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">Dijkstra Algorithm</a>
            </li>
            <li className="nav-item">
              <button type="button" id = "dijkstra"className="btn btn-secondary" onClick={BridgeanimateDijsktra}>Visulise with Dijkstra!</button>
            </li>
            <li>
              <button type="button" id = "greedyBFS"className="btn btn-secondary" onClick={BridgeanimateGreedyBFS}>Visulise Greedy BFS!</button>
            </li>
            {/* <li className="nav-item">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Choose Algorithm!
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item Dijkstra" onClick = {BridgeanimateDijsktra}>Dijkstra</a>
                  <a className="dropdown-item Greedy" onClick = {BridgeanimateGreedyBFS}>Greedy first search</a>
                </div>
              </div>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" tabIndex="-1" aria-disabled="true" onClick = {Clear}>Clear Board</a>
            </li>
          </ul>
        </div>
      </nav>

        <div className = "featureDescription">
          <div className = "wall-description-container">
            <div>
            <img className = "imageseperation" src = "./images/shortest path node.png" alt=""/>  Shortest Path Node
            <img className = "imageseperation" src="./images/visited node.png" alt=""/>  Visited Node
            <img className = "imageseperation" src="./images/wall.png" alt=""/>  Wall
            <img className = "imageseperation" src="./images/start node.png" alt=""/>  Start Node
            <img className = "imageseperation" src="./images/end node.png" alt=""/>  End Node  

            </div>
            
            
            
            
          </div>
          <h1>Walls can be created by dragging your Mouse!</h1>
        </div>
        
        
        <div className="grid">
          {Grid.map(function (row, rowIdx){
            return (
              <div key={rowIdx} className = {`row ${rowIdx}`}>
                {row.map(function (node, nodeIdx){
                  const { row, col, isFinish, isStart, isWall,isVisited} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isPressed = {isPressed}
                      isStartPressed = {isStartPressed}
                      isEndPressed = {isEndPressed}
                      isFinish={isFinish}
                      isStart= {isStart}
                      isWall={isWall}
                      row={row}
                      isVisited = {isVisited}
                      onMouseDown={(row,col) => handleMouseDown(row, col)}
                      onMouseEnter={(row,col) => handleMouseEnter(row, col)}
                      onMouseLeave={(row,col) => handleMouseLeave(row, col)}
                      onMouseUp={(row,col) => handleMouseUp(row, col)}
                      ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
  );

}

const initialGrid = function(){

  var grid =[];
  for(let row = 0 ; row < 25 ; row++){
      var rowArray = [];
      for(let col=0;col< 60;col++){
          rowArray.push(createNode(col,row));     
      }
  grid.push(rowArray);
  }
  return grid;
}

const createNode = function (col, row) {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    heuristic: Infinity,
    isWall: false,
    isVisited: false,
    previousnode: null
    
  };
};

  
const getNewGridWithWallToggled = (Grid, row, col) => {
  const newGrid = Grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default Pathfinding;