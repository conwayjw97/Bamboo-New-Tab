/* global chrome */

import { useEffect, useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";
import Search from "./components/search/Search.js";
import Settings from "./components/settings/Settings.js";

function App(props) {
  let initialSettings = {
    width: 600,
    height: 400,
    trees: 350,
    camera: "default"
  };

  if (chrome.storage !== undefined && props.bamboo_new_tab_settings === undefined) {
    chrome.storage.sync.set({"bamboo_new_tab_settings": initialSettings});
  } else if(props.bamboo_new_tab_settings !== undefined) {
    initialSettings = props.bamboo_new_tab_settings;
  }

  const [settings, setSettings] = useState(initialSettings);
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
    if(chrome.storage != undefined){
      chrome.storage.sync.set({"bamboo_new_tab_settings": settings});
    }

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
