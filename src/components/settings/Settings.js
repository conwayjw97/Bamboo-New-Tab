import React, { useEffect, useState, useRef } from "react";

import "./Settings.css";

function Settings(props) {
  const [showing, setShowing] = useState(false);

  const handleButtonClick = (event) => {
    setShowing(!showing);
  }

  const handleUpdate = (event) => {
    props.handleUpdate(event);
  }

  return (
    <div>
      <button className="button openButton" style={{top: window.innerHeight-60, left: window.innerWidth-60}} onClick={handleButtonClick}>&#9998;</button>
      <div className="settingsMenu" style={{width: showing ? "300px" : "0"}}>
        <button className="button closeButton" onClick={handleButtonClick}>&times;</button>

        <label className="title">
            Graphics
        </label>

        <div className="separator" />

        <div className="variable">
          <span className="variableName">
            Width
          </span>
          <span className="variableInput">
            <input type="range" id="width" min="10" max="1000" value={props.settings.width} onChange={props.handleSettingsChange} />
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
            <input type="range" id="height" min="10" max="1000" value={props.settings.height} onChange={props.handleSettingsChange} />
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
            <input type="range" id="trees" min="1" max="1000" value={props.settings.trees} onChange={props.handleSettingsChange} />
          </span>
          <span className="variableValue">
            {props.settings.trees}
          </span>
        </div>

        <div className="separator" />

        <label className="info">
            More trees will result in<br/>increased resource and<br/>battery usage!
        </label>

        <div className="separator" />

        <label className="title">
            Camera
        </label>

        <div className="separator" />

        <div className="variable">
          <span className="variableName">
            View
          </span>
          <span className="variableInput">
            <select id="camera" onChange={props.handleSettingsChange}>
              <option value="default">Default</option>
              <option value="top-down">Top-Down</option>
            </select>
          </span>
          <span className="variableValue">
          </span>
        </div>

        <div className="separator" />

        <button className="update" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default Settings;
