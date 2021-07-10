import React, { useEffect, useState, useRef } from "react";

import "./Search.css";

function Search(props) {
  const [query, _setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Click Here to Search");

  const field = useRef(null);
  const queryRef = useRef(query);

  const setQuery = x => {
    queryRef.current = x;
    _setQuery(x);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      window.location.href = "https://www.google.com/search?q=" + queryRef.current;
    }
  }

  useEffect(() => {
    document.addEventListener("keypress", handleSubmit);

    field.current.onclick = () => {
      setPlaceholder("");
    }

    field.current.onblur = () => {
      setPlaceholder("Click Here to Search");
    }
  }, []);

  return (
    <div>
      <input className="search" ref={field} type="text" spellCheck="false"
        style={{top: window.innerHeight/2, width: window.innerWidth}}
        value={query} onChange={handleQueryChange} onSubmit={handleSubmit} placeholder={placeholder} />
    </div>
  );
}

export default Search;
