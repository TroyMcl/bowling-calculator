const {Bowling} = require ('./schema.js');

let getGameStats = (id, cb) => {
  Bowling.findOne({bowlerNum: id}, (err,res) => {
    if(err) {
    } else {
      console.log('inside the db fn', res)
      cb(null,res)
    }
  })
}

let updateGameStats = (id, game, cb) => {
  Bowling.updateOne({bowlerNum: id}, game, {upsert: true}, (err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null,err)
    }
  })
}

module.exports = {
  getGameStats,
  updateGameStats
}