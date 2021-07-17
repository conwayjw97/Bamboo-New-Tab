import React, { useEffect, useRef } from "react";

import "./Canvas.css";

import Forest from "../../graphics/Forest.js";

function Canvas(props) {
  const canvas = useRef(null);
  const forest = useRef(null);

  useEffect(() => {
    forest.current = new Forest(canvas.current, props.settings);
  }, []);

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
