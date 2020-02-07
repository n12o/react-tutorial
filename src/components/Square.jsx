import React from 'react';

export default function Square(props) {
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