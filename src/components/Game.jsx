import React, { useState } from 'react';
import Board from './Board';

export default function Game() {
  //Create state
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      location: null
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [reverse, setReverse] = useState(false);
  //End of states

  //Array of current squares
  const current = history[stepNumber];
  //Returns array of winners (line) and player who won (X or O)
  const [winners, winner] = calculateWinner(current.squares) || [false, false];

  const bold = {
    fontWeight: 'bold'
  };

  //Create history array
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move#${move} ${locationString(step.location)}`
      : 'Go to game start';
    return (
      <li key={move}>
        <button
          style={move === stepNumber ? bold : {}}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  //Create reverse history array
  const revMoves = Array.from(moves).reverse();

  //Set status message
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (stepNumber >= 9) {
    status = "It's a draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //Do nothing if game is won or clicked twice on the same square
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      newHistory.concat({
        squares: squares,
        location: i
      })
    );
    setXIsNext(!xIsNext);
    setStepNumber(history.length);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          winners={winners ? winners : false} //pass array of winners if game is won
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{reverse ? revMoves : moves}</ol>
      </div>
      <div className='toggle-reverse'>
        <label htmlFor='reverse'>History in descending order</label>
        <input
          onClick={() => setReverse(reverse ? false : true)}
          type='checkbox'
          name='reverse'
          id='reverse'
        />
      </div>
    </div>
  );
}

//Functions
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [lines[i], squares[a]];
    }
  }
  return null;
}

function locationString(location) {
  return `(col${findCol(location)}, row${findRow(location)})`;
}

function findCol(square) {
  if (square === 0 || square === 3 || square === 6) {
    return 1;
  } else if (square === 1 || square === 4 || square === 7) {
    return 2;
  } else {
    return 3;
  }
}

function findRow(square) {
  if (square === 0 || square === 1 || square === 2) {
    return 1;
  } else if (square === 3 || square === 4 || square === 5) {
    return 2;
  } else {
    return 3;
  }
}
