/**
 * Models
 */
const db = require('../services/db.service');
const User = require('../models/user.model');
const Game = require('../models/game.model');

module.exports = function(req, res, next) {
  let userId = req.user['id'];
  let gameId = req.body['gameId'];
  let errors = [];

  Game.findById({_id: gameId}, (err, game) => {
    if(err || !game) {
      errors.push('Unable to discard the game, please try again.');
    }
    User.findById({_id: userId}, (err, user) => {
      if(err || !user) {
        errors.push('Unable to discard the game, please try again.');
      }
      User.findByIdAndUpdate({_id: userId}, {$pull: {myGames: gameId}}, (err, updated) => {
        if(err || !updated) {
          errors.push('Unable to discard the game, please try again.');
          console.log(err)
        }
        Game.remove({_id: gameId}, (err, removed) => {
          if(err || !removed) {
            errors.push('Unable to discard the game, please try again.');
          }
          return res.json({errors});
        });
      });
    });
  });
}