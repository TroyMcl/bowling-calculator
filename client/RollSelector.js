import { update } from 'lodash';
import React, { useState } from 'react';

const RollSelector = ({ pickRoll, startNewGame }) => {
  const [availableRolls, setAvailableRolls] = useState([0,1,2,3,4,5,6,7,8,9,10]);
  const [first, setFirst] =  useState(false)

  const updateRolls = (roll) => {
    if (+roll === 10) {
      return;
    } else if (roll === 11) {
      setAvailableRolls([0,1,2,3,4,5,6,7,8,9,10]);
      return;
    }
    if (first) {
      setAvailableRolls([0,1,2,3,4,5,6,7,8,9,10]);
      setFirst(false);
    } else {
      let validRolls = availableRolls.slice(0, (11 - roll));
      setAvailableRolls(validRolls);
      setFirst(true);
    }
  }

  return (
    <form className="select-roll">
      {availableRolls.map(roll => {
        return (<label key={roll} className="roll-btn">
          <input name="pin" type="button" value={roll} onClick={(e) => {
            pickRoll(e.target.value);
            updateRolls(e.target.value);
          }} />
        </label>)
      })}

      <button id="submit" onClick={(e) => {
        startNewGame(e);
        updateRolls(11);
      }}
      >Reset Game</button>
    </form>
  )
}

export default RollSelector;