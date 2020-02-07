import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const highlight = {
    color: 'white',
    backgroundColor: 'brown'
  };

  return (
    <button
      style={props.winner ? highlight : {}}
      className='square'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Board(props) {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];

  let [win1, win2, win3] = props.winners || [false, false, false];

  const squareB = rows.map(row => {
    return (
      <div key={row[1] + 11} className='board-row'>
        {row.map(i => (
          <Square
            winner={win1 === i || win2 === i || win3 === i}
            key={i}
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
          />
        ))}
      </div>
    );
  });

  return <div>{squareB}</div>;
}

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [reverse, setReverse] = useState(false);

  const current = history[stepNumber];
  const [winners, winner] = calculateWinner(current.squares) || [false, false];

  const bold = {
    fontWeight: 'bold'
  };

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
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

  const revMoves = Array.from(moves).reverse();

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
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      newHistory.concat({
        squares: squares
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
          winners={winners ? winners : false}
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{reverse ? revMoves : moves}</ol>
      </div>
      <div>
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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

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
