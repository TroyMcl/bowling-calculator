import React from 'react';

const Frame = ({frame}) => {
  const { first, second, score } = frame;

  return (
    <div className="frame">
      <div className="first-roll">
        <h2>{first}</h2>
      </div>
      <div className="second-roll">
        <h2>{second}</h2>
      </div>
      <div className="score" >
        <h2>{score}</h2>
      </div>
    </div>
  )
}

export default Frame;