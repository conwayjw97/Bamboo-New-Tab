/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if(chrome.storage != undefined){
  chrome.storage.sync.get(["bamboo_new_tab_settings"], function(data) {
    ReactDOM.render(
      <React.StrictMode>
        <App {...data} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
