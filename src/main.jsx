/*
  ============================================================================
  STEP 2: main.jsx - React Starts Here
  ============================================================================
  
  This is where React takes control! This file connects React to the HTML.
  
  KEY CONCEPTS:
  - import: Brings in code from other files or libraries
  - ReactDOM: React's tool for putting components into the HTML page
  - createRoot: Tells React where to render (the #root div)
  - render: Actually puts the component on the screen
  
  THE FLOW:
  1. Browser loads index.html
  2. Browser executes this file (main.jsx)
  3. We find the #root div from HTML
  4. We tell React to render the App component there
  5. React takes over and manages the app
*/

// Import React - gives us React features (components, hooks, etc.)
import React from 'react'

// Import ReactDOM - React's tool for putting components into the HTML page
// 'react-dom/client' is the modern way (React 18+)
import ReactDOM from 'react-dom/client'

// Import our main App component (the game itself)
// This is a file we created: src/App.jsx
import App from './App'

// Import CSS for styling
import './index.css'

/*
  ============================================================================
  THE MAGIC HAPPENS HERE - Mounting React to the DOM
  ============================================================================
  
  Breaking down this line step by step:
  
  1. document.getElementById('root')
     - Finds the <div id="root"> from index.html
     - Returns that HTML element
  
  2. ReactDOM.createRoot(...)
     - Tells React: "This is where you'll work"
     - Creates a React "root" container
     - Think of it as React's workspace
  
  3. .render(...)
     - This is the MAGIC! It says "put this component here"
     - React takes the App component and puts it inside #root
     - React converts JSX to real HTML and displays it
  
  4. <App />
     - This is our main game component
     - The < /> syntax is JSX (JavaScript XML)
     - It's like calling a function that returns HTML
  
  5. <React.StrictMode>
     - Wraps our app for development
     - Helps catch bugs and warnings
     - You can ignore this for now - it's just a helper
  
  IN SIMPLE TERMS:
  "Hey React, find the #root div and put the App component inside it!"
  
  After this runs, React takes over and manages everything!
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

