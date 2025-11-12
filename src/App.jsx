import { useState } from 'react'
import './App.css'

/**
 * REACT CONCEPTS DEMONSTRATED IN THIS APP:
 * 
 * 1. COMPONENTS: This is a functional component (a function that returns JSX)
 * 2. HOOKS: useState hook to manage component state
 * 3. JSX: The HTML-like syntax (actually JavaScript)
 * 4. PROPS: Passing data to child components
 * 5. EVENT HANDLERS: onClick functions to handle user interactions
 * 6. CONDITIONAL RENDERING: Showing different content based on state
 */

function App() {
  // useState is a React Hook that lets you add state to functional components
  // It returns an array: [currentValue, functionToUpdateValue]
  // 'board' stores the 9 squares: null, 'X', or 'O'
  const [board, setBoard] = useState(Array(9).fill(null))
  
  // Track whose turn it is (true = X, false = O)
  const [isXNext, setIsXNext] = useState(true)
  
  // Track if the game is over
  const [gameOver, setGameOver] = useState(false)

  /**
   * This function calculates if there's a winner
   * It checks all possible winning combinations
   */
  const calculateWinner = (squares) => {
    // All possible winning combinations (rows, columns, diagonals)
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ]

    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      // If all three squares in a line have the same value (and it's not null)
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] // Return 'X' or 'O' as the winner
      }
    }
    return null // No winner yet
  }

  /**
   * This function handles when a square is clicked
   * It's an event handler - React uses these to respond to user actions
   */
  const handleClick = (index) => {
    // Don't allow moves if:
    // 1. The square is already filled
    // 2. The game is over
    // 3. There's already a winner
    if (board[index] || gameOver || calculateWinner(board)) {
      return
    }

    // Create a copy of the board array (React state should be immutable)
    // We can't directly modify the board, we must create a new array
    const newBoard = [...board]
    
    // Set the clicked square to 'X' or 'O' based on whose turn it is
    newBoard[index] = isXNext ? 'X' : 'O'
    
    // Update the board state (this triggers a re-render!)
    setBoard(newBoard)
    
    // Switch turns
    setIsXNext(!isXNext)

    // Check if the game is over after this move
    if (calculateWinner(newBoard) || newBoard.every(square => square !== null)) {
      setGameOver(true)
    }
  }

  /**
   * This function resets the game
   * It sets all state back to initial values
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
  }

  // Calculate the current winner (if any)
  const winner = calculateWinner(board)
  
  // Determine what status message to show
  let status
  if (winner) {
    status = `Winner: ${winner}! 🎉`
  } else if (board.every(square => square !== null)) {
    status = "It's a tie! 🤝"
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`
  }

  // This is JSX - it looks like HTML but it's actually JavaScript
  // React converts this into actual DOM elements
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <p className="subtitle">Learn React by playing!</p>
      
      {/* Conditional rendering: only show status if game isn't over */}
      <div className="status">{status}</div>
      
      {/* The game board - a grid of 9 squares */}
      <div className="board">
        {/* map() is used to create 9 Square components */}
        {/* Each square gets: */}
        {/* - value: what to display (null, 'X', or 'O') */}
        {/* - onClick: function to call when clicked */}
        {/* - index: position in the array */}
        {board.map((value, index) => (
          <Square
            key={index} // React needs a unique key for each element in a list
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      
      {/* Reset button - only show if game is over */}
      {(winner || gameOver) && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
      
      {/* Educational info section */}
      <div className="info">
        <h3>React Concepts Used:</h3>
        <ul>
          <li><strong>useState:</strong> Manages the board, turn, and game state</li>
          <li><strong>Components:</strong> App and Square are reusable components</li>
          <li><strong>Props:</strong> Data passed from App to Square (value, onClick)</li>
          <li><strong>Event Handlers:</strong> onClick functions respond to clicks</li>
          <li><strong>Conditional Rendering:</strong> Different UI based on game state</li>
          <li><strong>State Updates:</strong> setBoard triggers re-renders</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * Square Component - A child component
 * This demonstrates component reusability
 * Props are passed from parent (App) to child (Square)
 */
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

export default App

