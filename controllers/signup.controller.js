/**
 * Node Modules
 */
const shortId = require('shortid');       // https://www.npmjs.com/package/shortid

/**
 * Models
 */
const User = require('../models/user.model.js');

module.exports = function(req, res, next) {
  
  ///////////////////////////
  // req.body
  // {
  //    email: string
  //    password: string   
  // }
  ///////////////////////////
  
  let validationErrors = [];
  
  let username = `user-${shortId.generate()}`;

  let newUser = new User({
    email: req.body['email'],
    username: username,
    password: req.body['password']
  });

  User.create(newUser, (err, user) => {
    if(err) {
      console.log(err);
      Object.keys(err.errors).forEach(key => {
        validationErrors.push(err.errors[key]['message'])
      });
    }
    return res.json({errors: validationErrors});
  });
}