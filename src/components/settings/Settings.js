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
      <div className="settingsMenu" style={{width: showing ? "250px" : "0"}}>
        <button className="button closeButton" onClick={handleButtonClick}>&times;</button>
      </div>
    </div>
  );
}

export default Settings;
