import { useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";
import Search from "./components/search/Search.js";
import Settings from "./components/settings/Settings.js";

function App() {
  const [settings, setSettings] = useState({
    width: 600,
    height: 400,
    trees: 350,
    camera: "default"
  });
  const [updateCount, setUpdateCount] = useState(0);

  const handleSettingsChange = (event) => {
    switch(event.target.id){
      case "width":
        setSettings(prev => ({...prev, width: parseInt(event.target.value)}));
        break;
      case "height":
        setSettings(prev => ({...prev, height: parseInt(event.target.value)}));
        break;
      case "trees":
        setSettings(prev => ({...prev, trees: parseInt(event.target.value)}));
        break;
      case "camera":
        setSettings(prev => ({...prev, camera: event.target.value}));
        break;
    }
  }

  const handleSave = () => {
    setUpdateCount(updateCount + 1);
  }

  return (
    <div className="App">
      <Canvas settings={settings} updateCount={updateCount}/>
      <Search />
      <Settings settings={settings} handleSettingsChange={handleSettingsChange} handleSave={handleSave}/>
    </div>
  );
}

export default App;
