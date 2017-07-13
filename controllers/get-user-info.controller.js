/**
 * Models
 */
const db = require('../services/db.service');
const User = require('../models/user.model');
const Game = require('../models/game.model');

module.exports = function(req, res, next) {
  let username = req.body['username'];
  User.findOne({username: username}, {_id: 0, __v: 0, password: 0, myRequests: 0, myGames: 0})
    .populate({path: 'myGames', select: {_id: 0, __v: 0, requstedBy: 0, owner: 0}})
    .exec((err, user) => {
      if(!err && user) {
        return res.json({user});
      }
      return res.json({user: {}});
    });
}