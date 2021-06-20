/*
To-Do:
  - Loading state
  - Fade in
  - Efficient refactoring
  - New models
  - Fix bamboo alpha
*/

import React, { useEffect, useState, useRef } from "react";
import "./Canvas.css";

import Forest from "../../graphics/Forest.js";

function Canvas(props) {
  const canvas = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const forest = new Forest(canvas.current);
    forest.render();
  }, []);

  return (
    <div>
      <canvas ref={canvas} width={width} height={height} className="canvas">
        <p>Your browser doesn't support canvas.</p>
      </canvas>
    </div>
  );
}

export default Canvas;
