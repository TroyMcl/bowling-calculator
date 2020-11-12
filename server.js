const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const calculateScore = require('./helpers/calculateScore');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req,res) => res.send('Boom server'));
app.get('/roll', (req, res) => {
  console.log('get works')
  res.send('route not built yet')
})

app.post('/calculateScore', (req, res) => {
  let {scoreArray, frameToScore} = req.body;
  console.log('score array', scoreArray)
  console.log('frame to cal', frameToScore)

  const updatedGameState = calculateScore(scoreArray, frameToScore);
  console.log('updatedGameState', updatedGameState)
  res.send(updatedGameState);

})

app.listen(port, () => console.log(`Challenge 3 server listening on ${port}`));