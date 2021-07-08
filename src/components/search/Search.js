import React, { useEffect, useState, useRef } from "react";

// import "./Search.css";

function Search(props) {
  return (
    <div className="box">
      <input style={{
          position:"absolute",
          left:"0px",
          top: window.innerHeight/2,
          textAlign: "center",
          width: window.innerWidth,
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "xx-large",
          fontFamily: "Tahoma, Geneva, sans-serif",
          letterSpacing: "-0.2px",
          wordSpacing: "6px",
          color: "rgb(71,191,2)"
        }}
        type="search" id="search" placeholder="Search" />
    </div>
  );
}

export default Search;
