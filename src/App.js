/* global chrome */

import { useEffect, useState } from "react";

import "./App.css";

import Canvas from "./components/canvas/Canvas.js";
import Search from "./components/search/Search.js";
import Settings from "./components/settings/Settings.js";

function App() {
  const initialSettings = {
    width: 600,
    height: 400,
    trees: 350,
    camera: "default"
  };
  const [settings, setSettings] = useState(initialSettings);
  const [updateCount, setUpdateCount] = useState(0);

  if(chrome.storage != undefined){
    chrome.storage.sync.get(["bamboo_new_tab_settings"], function(data) {
      if (data.bamboo_new_tab_settings === undefined) {
        console.log("Empty");
        setSettings(initialSettings);
        chrome.storage.sync.set({"bamboo_new_tab_settings": settings}, function() {
          console.log("bamboo_new_tab_settings is set to " + settings.toString());
        });
      } else {
        console.log("Existing");
        console.log(data.bamboo_new_tab_settings);
        setSettings(data.bamboo_new_tab_settings);
      }
    });
  }

  console.log("initialSettings");
  console.log(initialSettings);

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
    console.log("handleSave");

    if(chrome.storage != undefined){
      chrome.storage.sync.set({"bamboo_new_tab_settings": settings}, function() {
        console.log("bamboo_new_tab_settings is set to " + settings.toString());
      });
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
