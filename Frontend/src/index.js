// Importing necessary modules
import React from 'react';
import { createRoot } from 'react-dom/client'; // Importing createRoot instead of ReactDOM
import App from './App'; // Main App component
import './index.css'; // Custom CSS

// Selecting the root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Creating a root

// Rendering the App component within StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);