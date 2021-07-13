import { useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";
import Search from "./components/search/Search.js";
import Settings from "./components/settings/Settings.js";

function App() {
  const [settings, setSettings] = useState({
    width: 600,
    height: 400,
    trees: 350
  });
  const [updateCount, setUpdateCount] = useState(0);

  const handleSettingsChange = (event) => {
    const newValue = parseInt(event.target.value);
    switch(event.target.id){
      case "width":
        setSettings(prev => ({...prev, width: newValue}));
        break;
      case "height":
        setSettings(prev => ({...prev, height: newValue}));
        break;
      case "trees":
        setSettings(prev => ({...prev, trees: newValue}));
        break;
    }
  }

  const handleUpdate = () => {
    setUpdateCount(updateCount + 1);
  }

  return (
    <div className="App">
      <Canvas settings={settings} updateCount={updateCount}/>
      <Search />
      <Settings settings={settings} handleSettingsChange={handleSettingsChange} handleUpdate={handleUpdate}/>
    </div>
  );
}

export default App;
