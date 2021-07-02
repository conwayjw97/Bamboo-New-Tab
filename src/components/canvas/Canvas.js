import React, { useEffect, useState, useRef } from "react";

import "./Canvas.css";

import Forest from "../../graphics/Forest.js";

function Canvas(props) {
  const canvas = useRef(null);
  const forest = useRef(null);

  useEffect(() => {
    forest.current = new Forest(canvas.current, props.settings);

    canvas.current.onmousemove = (e) => {
      if(!forest.current.bamboo.isFadingIn){
        const x = (e.clientX / window.innerWidth) * 2 - 1;
    	  const y = -(e.clientY / window.innerHeight) * 2 + 1;
        forest.current.onMouseMove(x, y);
      }
    }
  }, []);

  // VERY inconvenient, find a more dynamic method to update scene for data change
  useEffect(() => {
    if(props.updateCount>0){
      forest.current.update(props.settings);
    }
  }, [props.updateCount]);


  return (
    <div>
      <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight} className="canvas">
        <p>Your browser doesn't support canvas.</p>
      </canvas>
    </div>
  );
}

export default Canvas;
