/**
 * Models
 */
const User = require('../models/user.model');
const Game = require('../models/game.model');

module.exports = function(req, res, next) {
  let userId = req.user['id'];
  let postedGame = req.body;
  postedGame['owner'] = userId;
  delete postedGame['_id'];
  
  let newGame = new Game(postedGame);
  
  let validationErrors = [];

  Game.create(newGame, (err, game) => {
    if(err) {
      Object.keys(err.errors).forEach(key => {
        validationErrors.push(err.errors[key]['message'])
      });
      return res.json({errors: validationErrors});
    }
    User.findByIdAndUpdate(userId, {$push: {myGames: game}}, (err, update) => {
      return res.json({errors: validationErrors});
    });
  });
}