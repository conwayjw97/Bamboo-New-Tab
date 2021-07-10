import { useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";
import Search from "./components/search/Search.js";

function App() {
  const [settings, setSettings] = useState({
    width: 600,
    height: 400,
    trees: 350
  });
  const [updateCount, setUpdateCount] = useState(0);

  const handleUpdate = () => {
    setUpdateCount(updateCount + 1);
  }

  return (
    <div className="App">
      <Canvas settings={settings} updateCount={updateCount}/>
      <Search />
    </div>
  );
}

export default App;
