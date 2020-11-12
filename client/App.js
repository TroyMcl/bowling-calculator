import React, {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import _, { set } from 'lodash';

import Scorebox from './Scorebox.js'
import RollSelector from './RollSelector.js';

const Bowling = () => {
  const [frameToScore, setFrameToScore] = useState(0);
  const [currentRoll, setCurrentRoll] = useState(0);
  const [frame, setFrame] = useState(0);
  const [scoreArray, setScoreArray] = useState(null);

  useEffect(() => {
    const board = generateBaord();
    setScoreArray(board);
  },[])

  const generateBaord = () => {
    const board = [];
    for ( let i = 0; i < 10; i++) {
      if ( i===9 ) {
        board.push({first:null,second:null,bonus:null,score:null})
      } else {
        board.push({first:null,second:null,score:null})
      }
    }
    return board;
  }

  const pickRoll = (roll) => {
    roll = +roll;
    if (frame > 9) {
      //endGame(); // will be a modal when done
      console.log("Game over");
      return
    }
    let copyScoreArray = _.cloneDeep(scoreArray);

    // find logic to run -> strike, spare, roll again, or score
    if (currentRoll === 0 && frame !== 9) {
      copyScoreArray[frame]['first'] = roll;
      if(roll === 10) {
        copyScoreArray[frame]['second'] = 0;
        calculateScore(copyScoreArray);
      } else {
        setScoreArray(copyScoreArray);
        setCurrentRoll(currentRoll + 1);
      }
    } else if ( frame !== 9 ) {
      copyScoreArray[frame]['second'] = roll;
      calculateScore(copyScoreArray);
    }

    if ( frame === 9 ) {
      handleFinalFrame(copyScoreArray, roll)
    }
  }

  const handleFinalFrame = (copyScoreArray, roll) => {
    // identify what roll we are on if its a strike
    if( currentRoll === 0) {
      copyScoreArray[frame]['first'] = roll;
      setScoreArray(copyScoreArray);
      setCurrentRoll(1);

    } else if (currentRoll === 1) {
      copyScoreArray[frame]['second'] = roll;
      if (copyScoreArray[frame]['first'] + copyScoreArray[frame]['second'] >= 10) {
        setScoreArray(copyScoreArray);
        setCurrentRoll(2);
      } else {
        calculateScore(copyScoreArray);
      }
    } else if (currentRoll === 2) {
      copyScoreArray[frame]['bonus'] = roll;
      calculateScore(copyScoreArray);
    }
  }

  const calculateScore = (copyScoreArray) => {
    fetch('http://localhost:3000/calculateScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scoreArray: copyScoreArray, frameToScore})
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setFrameToScore(response.frame);
      setCurrentRoll(0);
      setFrame(frame + 1);
      setScoreArray(response.score);
    })
  }

  const startNewGame = (e) => {
    e.preventDefault();
    const clearScore = generateBaord();
    setFrameToScore(0);
    setCurrentRoll(0);
    setFrame(0);
    setScoreArray(clearScore);
  }


  return (
    <div>
      <Scorebox scoreArray={scoreArray} frameToScore={frameToScore} />
      <RollSelector  pickRoll={pickRoll}  startNewGame={startNewGame} />
    </div>
  )

}

ReactDOM.render(<Bowling />, document.getElementById('bowling'))
