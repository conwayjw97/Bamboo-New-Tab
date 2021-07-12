import React, { useEffect, useState, useRef } from "react";

import "./Settings.css";

function Settings(props) {
  const [showing, setShowing] = useState(false);

  const handleButtonClick = (event) => {
    setShowing(true);
  }

  const settingsScreen = () => {
    if(showing){
      // https://www.w3schools.com/howto/howto_js_sidenav.asp
    }
  }

  return (
    <div>
      <button className="button" style={{top: window.innerHeight-60, left: window.innerWidth-60}} onClick={handleButtonClick}>&#9998;</button>
    </div>
  );
}

export default Settings;
