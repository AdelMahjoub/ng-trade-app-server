/**
 * Models
 */
const db = require('../services/db.service');
const User = require('../models/user.model');
const Game = require('../models/game.model');

module.exports = function(req, res, next) {
   let gameId = req.body['gameId'];
  let userId = req.user['id'];
  let errors = [];
  Game.findById(gameId, (err, game) => {
    if(err || !game) {
      errors.push('Game not found');
    }
    User.findById(userId, (err, user) => {
      if(err || !user) {
        errors.push('Game request fails, please try again.');
      }
      if(user['myRequests'].indexOf(gameId) !== -1) {
        errors.push('Game already requested.');
        return res.json({errors});
      } 
      user['myRequests'].push(game);
      game['requestedBy'].push(user);
      user.save((err, updated) => {
        if(err || !updated) {
          errors.push('Game request fails, please try again.')
        }
        game.save((err, result) => {
          if(err || !updated) {
            errors.push('Game request fails, please try again.')
          }
          return res.json({errors});
        })
      });
    });
  });
}