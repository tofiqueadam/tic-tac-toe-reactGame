# Tic Tac Toe - React Learning Project

A simple Tic Tac Toe game built with React to help you understand React concepts!

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 📚 React Concepts Explained

This project demonstrates:

### 1. **Components**
- `App.jsx` - The main component
- `Square` - A reusable child component
- Components are functions that return JSX (HTML-like syntax)

### 2. **useState Hook**
- Manages component state (data that can change)
- `useState` returns `[value, setValue]`
- When state changes, React automatically re-renders the component

### 3. **Props**
- Data passed from parent to child components
- Example: `Square` receives `value` and `onClick` as props

### 4. **Event Handlers**
- Functions that respond to user actions (like clicks)
- Example: `onClick={() => handleClick(index)}`

### 5. **Conditional Rendering**
- Showing different UI based on state
- Example: Only showing "Play Again" button when game is over

### 6. **JSX**
- JavaScript syntax that looks like HTML
- Allows you to write HTML in JavaScript
- Example: `<div className="board">...</div>`

## 🎮 How to Play

1. Click any empty square to place your mark (X or O)
2. Players alternate turns
3. First to get 3 in a row (horizontal, vertical, or diagonal) wins!
4. Click "Play Again" to start a new game

## 📖 Key Learning Points

- **State Management**: The `board` array stores the game state
- **Immutability**: We create new arrays instead of modifying existing ones
- **Re-rendering**: When state changes, React updates the UI automatically
- **Component Communication**: Parent (App) passes data to child (Square)

## 🛠️ Technologies Used

- React 18
- Vite (build tool)
- CSS3 (for styling)

Enjoy learning React! 🎉

