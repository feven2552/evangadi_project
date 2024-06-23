import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700,700i"></link>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <App />
    </BrowserRouter>    
  </React.StrictMode>
);


