import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// This is where we "mount" our React app to the HTML
// ReactDOM.createRoot creates a root container and renders our App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

