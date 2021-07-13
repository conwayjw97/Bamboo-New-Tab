import React, { useEffect, useState, useRef } from "react";

import "./Settings.css";

function Settings(props) {
  const [showing, setShowing] = useState(false);

  const handleButtonClick = (event) => {
    setShowing(!showing);
  }

  return (
    <div>
      <button className="button openButton" style={{top: window.innerHeight-60, left: window.innerWidth-60}} onClick={handleButtonClick}>&#9998;</button>
      <div className="settingsMenu" style={{width: showing ? "300px" : "0"}}>
        <button className="button closeButton" onClick={handleButtonClick}>&times;</button>
        <label className="title">
            Graphics
        </label>
        <div className="variable">
          <span className="variableName">
            Width
          </span>
          <span className="variableInput">
            <input type="range" id="width" name="width" min="10" max="1000" value={props.settings.width} onChange={props.handleSettingsChange} />
          </span>
          <span className="variableValue">
            {props.settings.width}
          </span>
        </div>
        <div className="variable">
          <span className="variableName">
            Height
          </span>
          <span className="variableInput">
            <input type="range" id="trees" name="trees" min="10" max="1000" value={props.settings.height} onChange={props.handleSettingsChange} />
          </span>
          <span className="variableValue">
            {props.settings.height}
          </span>
        </div>
        <div className="variable">
          <span className="variableName">
            Trees
          </span>
          <span className="variableInput">
            <input type="range" id="trees" name="trees" min="1" max="1000" value={props.settings.trees} onChange={props.handleSettingsChange} />
          </span>
          <span className="variableValue">
            {props.settings.trees}
          </span>
        </div>
        <button className="update" onClick={props.handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default Settings;
