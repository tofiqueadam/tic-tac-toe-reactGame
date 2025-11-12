/*
  ============================================================================
  STEP 3: App.jsx - The Main Game Component
  ============================================================================
  
  This is the heart of our app! This component contains all the game logic.
  
  REACT CONCEPTS DEMONSTRATED:
  1. COMPONENTS: This is a functional component (a function that returns JSX)
  2. HOOKS: useState hook to manage component state
  3. JSX: The HTML-like syntax (actually JavaScript)
  4. PROPS: Passing data to child components
  5. EVENT HANDLERS: onClick functions to handle user interactions
  6. CONDITIONAL RENDERING: Showing different content based on state
  
  WHAT IS A COMPONENT?
  - A component is just a function that returns JSX (HTML-like code)
  - When React calls this function, it gets the JSX and displays it
  - Components are like building blocks - you can reuse them
*/

import { useState } from 'react'
import './App.css'

/**
 * ============================================================================
 * THE APP COMPONENT - Main Game Logic
 * ============================================================================
 * 
 * This function is a React component. It:
 * 1. Manages the game state (board, turns, game over)
 * 2. Handles user clicks
 * 3. Calculates winners
 * 4. Returns JSX (what you see on screen)
 * 
 * Every time state changes, React calls this function again (re-renders)
 * and updates the screen automatically!
 */
function App() {
  /*
    ========================================================================
    PART A: useState Hook - Managing Data That Changes
    ========================================================================
    
    This is the MOST IMPORTANT React concept!
    
    WHAT IS useState?
    - It's a React "Hook" (a special function)
    - It lets components "remember" data that can change
    - When the data changes, React automatically updates the screen
    
    HOW IT WORKS:
    useState returns an array with two things:
    [currentValue, functionToUpdateValue]
    
    - First value (board): The current data (read-only)
    - Second value (setBoard): Function to change the data
    
    WHY TWO NAMES?
    - board: Use this to READ the current value
    - setBoard: Use this to CHANGE the value (triggers screen update!)
    
    EXAMPLE:
    console.log(board)        // Read: [null, null, null, ...]
    setBoard(['X', null, ...]) // Change: Updates screen automatically!
    
    WHY NOT JUST: let board = [...]?
    Because React won't detect changes to regular variables.
    useState tells React "watch this - when it changes, update the screen!"
  */
  
  // Board state: Array of 9 squares, each can be null, 'X', or 'O'
  // Array(9).fill(null) creates: [null, null, null, null, null, null, null, null, null]
  const [board, setBoard] = useState(Array(9).fill(null))
  
  // Turn state: true = X's turn, false = O's turn
  const [isXNext, setIsXNext] = useState(true)
  
  // Game over state: true = game ended, false = game still active
  const [gameOver, setGameOver] = useState(false)

  /**
   * ========================================================================
   * PART B: Helper Function - Checking for Winner
   * ========================================================================
   * 
   * This is just regular JavaScript - not React-specific!
   * 
   * WHAT IT DOES:
   * - Takes the board array as input
   * - Checks all 8 possible winning combinations:
   *   * 3 rows (horizontal)
   *   * 3 columns (vertical)
   *   * 2 diagonals
   * - If 3 squares in a row match (and aren't empty), return the winner
   * - Otherwise, return null (no winner yet)
   * 
   * HOW IT WORKS:
   * 1. Define all winning patterns (which 3 squares make a win)
   * 2. Loop through each pattern
   * 3. Check if all 3 squares have the same value (X or O)
   * 4. If yes, return that value as the winner
   */
  const calculateWinner = (squares) => {
    // All possible winning combinations
    // Each array contains 3 indices that form a winning line
    const lines = [
      [0, 1, 2], // top row (squares 0, 1, 2)
      [3, 4, 5], // middle row (squares 3, 4, 5)
      [6, 7, 8], // bottom row (squares 6, 7, 8)
      [0, 3, 6], // left column (squares 0, 3, 6)
      [1, 4, 7], // middle column (squares 1, 4, 7)
      [2, 5, 8], // right column (squares 2, 5, 8)
      [0, 4, 8], // diagonal top-left to bottom-right (squares 0, 4, 8)
      [2, 4, 6], // diagonal top-right to bottom-left (squares 2, 4, 6)
    ]

    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i] // Get the 3 square indices for this line
      
      // Check if all three squares have the same value (and it's not null)
      // squares[a] && ... checks that square 'a' is not null
      // squares[a] === squares[b] checks that a and b match
      // squares[a] === squares[c] checks that a and c match
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] // Return 'X' or 'O' as the winner
      }
    }
    return null // No winner yet
  }

  /**
   * ========================================================================
   * PART C: Event Handler - What Happens When You Click a Square
   * ========================================================================
   * 
   * This function runs when a user clicks on a square.
   * 
   * THE COMPLETE FLOW WHEN YOU CLICK:
   * 1. User clicks a square
   * 2. Square's onClick calls handleClick(index)
   * 3. This function runs:
   *    - Checks if move is valid
   *    - Creates new board array
   *    - Updates the clicked square
   *    - Calls setBoard(newBoard) ← THIS IS THE MAGIC!
   * 4. React detects state changed (because we called setBoard)
   * 5. React automatically re-renders the App component
   * 6. App function runs again with new board value
   * 7. New JSX is generated with updated board
   * 8. React updates the screen to show the new board
   * 9. User sees the X or O appear!
   * 
   * KEY CONCEPT: When you call setBoard, React automatically updates the screen!
   */
  const handleClick = (index) => {
    /*
      GUARD CLAUSE: Don't allow invalid moves
      Exit early if:
      - Square is already filled (board[index] is not null)
      - Game is over
      - There's already a winner
    */
    if (board[index] || gameOver || calculateWinner(board)) {
      return // Exit early - do nothing
    }

    /*
      CRITICAL: Create a COPY of the board array
      
      Why? React requires IMMUTABILITY (don't modify existing state)
      - We can't do: board[index] = 'X' ❌
      - We must do: const newBoard = [...board] then modify newBoard ✅
      
      [...board] is the "spread operator" - it copies the array
      This is how React detects changes and knows to update the screen
    */
    const newBoard = [...board]
    
    /*
      Update the clicked square
      Ternary operator: isXNext ? 'X' : 'O'
      - If isXNext is true, use 'X'
      - If false, use 'O'
    */
    newBoard[index] = isXNext ? 'X' : 'O'
    
    /*
      UPDATE STATE - This triggers React to re-render!
      When you call setBoard, React:
      1. Updates the board value
      2. Calls the App function again
      3. Generates new JSX with updated board
      4. Updates the screen automatically
    */
    setBoard(newBoard)
    
    // Switch turns: if X just went, now it's O's turn
    setIsXNext(!isXNext)

    /*
      Check if game is over after this move
      - calculateWinner(newBoard): Did someone win?
      - newBoard.every(...): Is the board full? (tie game)
    */
    if (calculateWinner(newBoard) || newBoard.every(square => square !== null)) {
      setGameOver(true)
    }
  }

  /**
   * ========================================================================
   * PART D: Reset Function
   * ========================================================================
   * 
   * Resets all state back to initial values
   * Called when user clicks "Play Again" button
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null)) // Reset board to all empty squares
    setIsXNext(true)               // X goes first
    setGameOver(false)             // Game is active again
  }

  /*
    ========================================================================
    PART E: Calculate What to Display
    ========================================================================
    
    Before rendering, we calculate:
    - Is there a winner?
    - What status message should we show?
  */
  
  // Check if there's a winner right now
  const winner = calculateWinner(board)
  
  // Determine what status message to show based on game state
  let status
  if (winner) {
    // Someone won!
    status = `Winner: ${winner}! 🎉`
  } else if (board.every(square => square !== null)) {
    // Board is full but no winner = tie
    status = "It's a tie! 🤝"
  } else {
    // Game still active - show whose turn it is
    status = `Next player: ${isXNext ? 'X' : 'O'}`
  }

  /*
    ========================================================================
    PART F: JSX - The Return Statement (What Gets Displayed)
    ========================================================================
    
    This is JSX (JavaScript XML) - it looks like HTML but it's actually JavaScript!
    React converts this into real HTML elements.
    
    JSX RULES:
    1. Looks like HTML, but it's JavaScript
    2. Use className instead of class (class is reserved in JavaScript)
    3. Use {} to embed JavaScript expressions
    4. Components start with capital letters (<Square />)
    5. Self-closing tags need /> (like <Square />)
  */
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <p className="subtitle">Learn React by playing!</p>
      
      {/* 
        Display the status message
        {status} - The {} lets us embed JavaScript in JSX
        This displays the value of the status variable
      */}
      <div className="status">{status}</div>
      
      {/* 
        ====================================================================
        THE GAME BOARD - Creating 9 Square Components
        ====================================================================
        
        .map() loops through the board array and creates a Square for each
        
        HOW IT WORKS:
        - board.map((value, index) => ...) loops through each square
        - For each square, it creates a <Square> component
        - value: what's in that square ('X', 'O', or null)
        - index: position in array (0-8)
        
        PROPS EXPLAINED:
        - key={index}: React needs this for lists (helps track which item is which)
        - value={value}: Passes the square's value to Square component
        - onClick={() => handleClick(index)}: Passes a function that runs when clicked
        
        ARROW FUNCTION: () => handleClick(index)
        - Creates a new function
        - When square is clicked, it calls handleClick(index)
        - The index tells us which square was clicked (0-8)
      */}
      <div className="board">
        {board.map((value, index) => (
          <Square
            key={index} // React needs unique keys for list items
            value={value} // Pass the square's value ('X', 'O', or null)
            onClick={() => handleClick(index)} // Pass click handler with the square's index
          />
        ))}
      </div>
      
      {/* 
        CONDITIONAL RENDERING: Only show button if game is over
        {(winner || gameOver) && ...} means:
        "If there's a winner OR game is over, show the button"
      */}
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
 * ============================================================================
 * PART G: Square Component - A Child Component
 * ============================================================================
 * 
 * This is a CHILD component - it's used by the App component.
 * 
 * WHAT ARE PROPS?
 * - Props are data passed FROM parent (App) TO child (Square)
 * - Like function parameters, but for components
 * - Props are READ-ONLY (child can't change them)
 * 
 * HOW IT WORKS:
 * 1. App component creates: <Square value="X" onClick={someFunction} />
 * 2. Square component receives: { value: "X", onClick: someFunction }
 * 3. Square displays value and calls onClick when clicked
 * 
 * DESTRUCTURING: { value, onClick }
 * - This extracts props from the props object
 * - Instead of props.value, we can just use value
 * - Instead of props.onClick, we can just use onClick
 * 
 * THIS DEMONSTRATES:
 * - Component Reusability: We create 9 Square components, all using same code
 * - Props: Parent (App) passes data to child (Square)
 * 
 * WHY SEPARATE COMPONENT?
 * - Makes code reusable and organized
 * - Each Square is independent
 * - Easier to maintain and understand
 */
function Square({ value, onClick }) {
  /*
    This component returns a button
    - value: What to display ('X', 'O', or nothing if null)
    - onClick: Function to call when button is clicked
    - {value}: Embed the value in JSX (shows X, O, or empty)
  */
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

export default App

