import React from 'react';
import Square from './Square'

export default function Board(props) {
  //create representation of board rows and indexes
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];

  //Destructure winner row into winner square indexes
  let [win1, win2, win3] = props.winners || [false, false, false];

  const squareBlock = rows.map(row => {
    return (
      <div key={row[1] + 11} className='board-row'>
        {row.map(i => (
          <Square
            //If square index is a winner props.winner equals true
            winner={win1 === i || win2 === i || win3 === i}
            key={i}
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
          />
        ))}
      </div>
    );
  });

  return <div>{squareBlock}</div>;
}