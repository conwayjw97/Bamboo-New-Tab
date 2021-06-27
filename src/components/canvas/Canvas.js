import React, { useEffect, useState, useRef } from "react";
import "./Canvas.css";

import Forest from "../../graphics/Forest.js";

function Canvas(props) {
  const canvas = useRef(null);

  useEffect(() => {
    const forest = new Forest(canvas.current);

    canvas.current.onmousemove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
  	  const y = -(e.clientY / window.innerHeight) * 2 + 1;
      forest.onMouseMove(x, y);
    }

    forest.render();
  }, []);



  return (
    <div>
      <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight} className="canvas">
        <p>Your browser doesn't support canvas.</p>
      </canvas>
    </div>
  );
}

export default Canvas;
