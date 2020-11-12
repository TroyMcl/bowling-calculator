import React from 'react';
import Frame from './Frame';

const Scorebox = ({scoreArray, frameToScore}) => {
  if (scoreArray === null) {
    return <div>loading...</div>
  }

  return(
    <div id="scorebox-container">
      { scoreArray.map((frame, i) => {
          return <Frame frame={frame} key={i} />
        })}
      <div id="total-score">
        <h2>Total: </h2>
        <h2>{frameToScore > 0 ? scoreArray[frameToScore-1].score: 0}</h2>
      </div>
    </div>
  )
}

export default Scorebox