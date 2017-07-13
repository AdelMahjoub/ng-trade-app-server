/**
 * Models
 */
const db = require('../services/db.service');
const User = require('../models/user.model');
const Game = require('../models/game.model');

module.exports = function(res, res, next) {
  Game.find()
    .populate({path: 'owner', select: {__v: 0, password: 0}})
    .exec((err, games) => {
      if(!err && games) {
        return res.json(games);
      }
    });
}