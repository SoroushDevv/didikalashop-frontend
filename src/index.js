import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles.css"
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop.jsx"




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

reportWebVitals();
