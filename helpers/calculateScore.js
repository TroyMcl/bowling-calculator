// score --> array of objects
// score objects { first: int, second: int, score: int}
// frame ---> int last fram calculated for display, 0 indexed

const calculateScore = (score, frame) => {
  let currentFrame = score[frame];
  let runningScore = frame === 0 ? 0 : score[frame - 1].score;


  if (frame === 7) {
    // check for being on fram 7 due to multiple stikes
    if (score[8].first === 10 && score[9].first === 10) {
      // score strikes for 7 and pass to frame 8 checker
      let { updatedScore, updatedFrame, updatedRunningScore } = strikeCalculator(score, frame, runningScore);
      score = updatedScore;
      frame = updatedFrame;
      runningScore = updatedRunningScore;
      currentFrame = score[frame];
    }
  }

  if (frame === 8) {
    let {updatedScore, updatedFrame, updatedRunningScore} = ninthFrame(score, frame, runningScore);
    console.log('===> here', updatedScore, updatedFrame, updatedRunningScore);
    score = updatedScore;
    frame = updatedFrame;
    runningScore = updatedRunningScore;
    currentFrame = score[frame];
  }

  if (frame === 9) {
    return tenthFrame(score, frame, runningScore);
  }

  if (currentFrame.first === 10) {
    let { updatedScore, updatedFrame, updatedRunningScore } = strikeCalculator(score, frame, runningScore);
    score = updatedScore;
    frame = updatedFrame;
    runningScore = updatedRunningScore;
    currentFrame = score[frame];
    // end of multiple strikes and need to calculate to current roll frame
    if (currentFrame.first === 10) {
      let { updatedScore, updatedFrame, updatedRunningScore } = strikeCalculator(score, frame, runningScore);
      score = updatedScore;
      frame = updatedFrame;
      runningScore = updatedRunningScore;
      currentFrame = score[frame];
    }

  }

  if (currentFrame.first + currentFrame.second === 10 && currentFrame.first !== 10) {
    if (score[frame + 1].first !== null) {
      runningScore += currentFrame.first + currentFrame.second +score[frame + 1].first;
      currentFrame.score = runningScore;
      frame = frame + 1;
      currentFrame = score[frame];
    }
  }

  if (currentFrame.first + currentFrame.second !== 10) {
    currentFrame.score = currentFrame.first + currentFrame.second + runningScore;
    frame = frame + 1;
  }

  return { score, frame }
};

const strikeCalculator = (score, frame, runningScore) => {
  // has the next frame been bowled?
  if (score[frame + 1].first !== null && score[frame + 1] !== null) {
    // were two stirkes in a row bowled && can we calculate a score
    const multipleStrikes = score[frame + 1]. first === 10 ? true : false;
    const scoreMultStrikes = (multipleStrikes && score[frame + 2].first !== null) ? true : false;
    if (multipleStrikes) {
      if (scoreMultStrikes) {
        runningScore += score[frame].first + score[frame + 1].first + score[frame + 2].first;
        score[frame].score = runningScore;
        return { updatedScore: score, updatedFrame: frame + 1, updatedRunningScore: runningScore };
      } else {
        return { updatedScore: score, updatedFrame: frame, updatedRunningScore: runningScore };
      }
    } else {
      runningScore += 10 + score[frame + 1].first + score[frame + 1].second;
      score[frame].score = runningScore;
      return { updatedScore: score, updatedFrame: frame + 1, updatedRunningScore: runningScore };
    }
  } else {
    return { updatedScore: score, updatedFrame: frame, updatedRunningScore: runningScore };
  }
};

// ninth frame
const ninthFrame = (score, frame, runningScore) => {
  console.log('inside 9th=====>', score, frame, runningScore)
  if (score[frame].first === null && score[frame].second === null) {
    return { updatedScore: score, updatedFrame: frame, updatedRunningScore: runningScore };
  }

  const strike = score[frame].first === 10 ? true : false;
  const spare = (!strike && score[frame].first + score[frame].second === 10) ? true : false;

  if (strike) {
    if (score[frame + 1] !== null) {
      runningScore += score[frame].first + score[frame + 1].first + score[frame + 1].second;
      score[frame].score = runningScore;
      return { updatedScore: score, updatedFrame: frame + 1, updatedRunningScore: runningScore }
    } else {
      return { updatedScore: score, updatedFrame: frame, updatedRunningScore: runningScore };
    }
  } else if (spare && score[frame + 1].first === null) {
    return { updatedScore: score, updatedFrame: frame + 1, updatedRunningScore: runningScore }
  } else if (spare) {
    runningScore += score[frame].first + score[frame].second + score[frame + 1].first;
    score[frame].score = runningScore;
    return { updatedScore: score, updatedFrame: frame + 1, updatedRunningScore: runningScore };
  }
  runningScore += score[frame].first + score[frame].second;
  score[frame].score = runningScore;
  return { updatedScore: score, updatedFrame: frame + 1, updatedRunningScore: runningScore };
};

const tenthFrame = (score, frame, runningScore) => {
  // is it time to calculate final frame
  let bonus = score[frame].bonus ? score[frame].bonus : 0;

  if (score[frame].first !== null && score[frame].second !== null) {
    runningScore += score[frame].first + score[frame].second + bonus;
    score[frame].score = runningScore;
    return { score, frame: frame + 1 };

  } else {
    return { score, frame, runningScore };
  }

}

module.exports = calculateScore;

// const s = [
//   {first: 3, second: 3, score: 6 },
//   {first: 3, second: 3, score: 12 },
//   {first: 3, second: 3, score: 18 },
//   {first: 3, second: 3, score: 24 },
//   {first: 3, second: 3, score: 30 },
//   {first: 3, second: 3, score: 36 },
//   {first: 3, second: 3, score: 42 },
//   {first: 3, second: 3, score: 58 },
//   {first: 5, second: 5, score: null },
//   {first: 2, second: 2, score: null, bonus: null},
// ];
// let f = 8;

// console.log('here', calculateScore( s, f ));