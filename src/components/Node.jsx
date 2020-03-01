import React from "react";
// import NodeStyle from "./NodeStyle.css"
// import NodeStyles from "./NodeStyles.css"

//This function allows to create Nodes in main grid.
//Grid Array is consisted of row Arrays which is also consisted of multiple colum Arrays.
//The elements in each array are all <div> </div>. 
//Ex) 2 x <div className ="Col" /> -> <div className ="Row" /> -> <div className ="Grid" /> 
function Node (props) {

    var extraClassname = props.isFinish ? "nodeEnd" : props.isStart ? "nodeStart" : props.isWall ? "nodeWall" : "normalNode";
    return <div
    id = {`node ${props.row}-${props.col}`}
    className = {`node ${extraClassname}`}
    onMouseDown={() => props.onMouseDown(props.row, props.col)}
    onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
    onMouseLeave ={() => props.onMouseLeave(props.row, props.col)}
    onMouseUp={() => props.onMouseUp(props.row, props.col)}
    
    >
    
    </div>
    
}


export default Node;