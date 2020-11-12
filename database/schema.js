const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/bowling'

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true})

var Schema = mongoose.Schema;

var bowling = new Schema ({
  bowlerNum: Number,
  score: [Number] ,
  rolls: [Number],
  rolls_strike: [Number],
  strike: Boolean,
  spare: Boolean,
  tries: Number,
  currRoll: Number,
})

var Bowling = mongoose.model('Bowling', bowling);

module.exports = {
  Bowling
}