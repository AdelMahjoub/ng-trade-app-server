/**
 * Node Modules
 */
const validator = require('validator');     // https://github.com/chriso/validator.js

// DB instance
const db = require('../services/db.service');

const GameSchema = db.Schema({
  name: {
    type: String,
    required: 'The game\'s title is required.',
  },
  url: {
    type: String,
    required: 'The games\'s platform is required.',
    validate: {
      validator: function(value) {
        return validator.isURL(value, {require_protocol: true});
      },
      msg: 'The game\'s url is invalid.'
    }
  },
  summary: {
    type: String,
    default: ' '
  },
  coverUrl: {
    type: String,
    required: 'The game\'s cover is required.',
    validate: {
      validator: function(value) {
        return validator.isURL(value);
      },
      msg: 'The game\'s cover url is invalid.'
    }
  },
  owner: {
    type: db.Schema.Types.ObjectId,
    ref: 'User'
  },
  available: {
    type: Boolean,
    default: true
  },
  requestedBy: [{ type: db.Schema.Types.ObjectId, ref: 'User' }]
});

GameSchema.pre('save', function(next) {
  this.summary = validator.escape(this.summary);
  this.name = validator.escape(this.name);
  next();
});

const Game = db.model('Game', GameSchema);

module.exports = Game;