import React, { useEffect, useState, useRef } from "react";

import "./Search.css";

function Search(props) {
  const field = useRef(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    field.current.select();

    field.current.onkeypress = (e) => {
      if (e.key === 'Enter') {
        console.log('do validate');
      }
    }
  }, []);

  const handleFieldChange = (query) => {
    console.log(query);
    setQuery(query);
  }

  return (
    <div>
      <input className="search" ref={field} type="text" placeholder=""
        style={{top: window.innerHeight/2, width: window.innerWidth}}
        onChange={handleFieldChange} />
    </div>
  );
}

export default Search;
