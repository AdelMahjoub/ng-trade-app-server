/**
 * Node Modules
 */
const jwt = require('jsonwebtoken');  // https://github.com/auth0/node-jsonwebtoken

module.exports = function(userId, ip, callback) {
  jwt.sign(
    { id: userId }, 
    process.env.SECRET,
    { expiresIn: '24h', audience: ip, issuer: process.env.ISSUER },
    (err, token) => {
      return callback(err, token);
    }
  );
}
