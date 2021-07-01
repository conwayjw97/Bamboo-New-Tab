import { useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";

import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from "react-dat-gui";
import "react-dat-gui/dist/index.css";

function App() {
  const [data, setData] = useState({
    width: 200,
    height: 25,
    trees: 100
  });

  const handleUpdate = (update) => {
    console.log(update);
  }

  return (
    <div className="App">
      <DatGui data={data} onUpdate={handleUpdate}>
        <DatNumber path="width" label="Width" min={10} max={800} step={1} />
        <DatNumber path="height" label="Height" min={10} max={800} step={1} />
        <DatNumber path="trees" label="Trees" min={1} max={500} step={1} />
      </DatGui>
      <Canvas data={data}/>
    </div>
  );
}

export default App;
