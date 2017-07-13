/**
 * Models
 */
const User = require('../models/user.model');

module.exports = function(req, res, next) {
  let userId = req.user['id'];
  User.findById(userId, {password: 0, __v: 0})
    .populate({
      path: 'myGames',
      populate: {
        path: 'owner requestedBy',
        select:{ username: 1, _id: 1 }
      },
      select: {__v: 0}
    })
    .populate({
      path: 'myRequests',
      populate: {
        path: 'owner',
        select: {username: 1, _id: 1}
      },
      select: {__v: 0}
    })
    .exec((err, user) => {
      if(!err && user) {
        return res.json({user})
      }
      return res.json({user: null})  
    });
}

