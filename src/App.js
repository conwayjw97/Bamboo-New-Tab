import { useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";

import DatGui, { DatButton, DatNumber } from "react-dat-gui";
import "react-dat-gui/dist/index.css";

function App() {
  const [settings, setSettings] = useState({
    width: 800,
    height: 400,
    trees: 350
  });
  const [updateCount, setUpdateCount] = useState(0);

  const handleChange = (datgui) => {
    setSettings({
      width: datgui.width,
      height: datgui.height,
      trees: datgui.trees
    });
  }

  const handleUpdate = () => {
    setUpdateCount(updateCount + 1);
  }

  return (
    <div className="App">
      <DatGui data={settings} onUpdate={handleChange}>
        <DatNumber path="width" label="Width" min={10} max={1000} step={1}/>
        <DatNumber path="height" label="Height" min={10} max={1000} step={1}/>
        <DatNumber path="trees" label="Trees" min={1} max={1000} step={1}/>
        <DatButton label="Update" onClick={handleUpdate}/>
      </DatGui>
      <Canvas settings={settings} updateCount={updateCount}/>
    </div>
  );
}

export default App;
