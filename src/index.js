import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// High-end startup intro cleanup
window.addEventListener('load', () => {
  const intro = document.getElementById('app-intro');
  if (intro) {
    // Hold the intro for 1.2 seconds (faster load)
    setTimeout(() => {
      intro.classList.add('ready-to-fade');
      document.body.classList.remove('intro-active');

      // Remove from DOM after transition completes
      setTimeout(() => {
        intro.remove();
      }, 800);
    }, 1200);
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
