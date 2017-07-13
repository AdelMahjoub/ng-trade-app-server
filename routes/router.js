// Node modules
const express = require('express');
const validator = require('validator');

// Router instance
const router = express.Router();

// Controllers
const login          = require('../controllers/login.controller');
const signup         = require('../controllers/signup.controller');
const emailIsUsed    = require('../controllers/check-email.controller');
const usernameIsUsed = require('../controllers/check-username.controller');
const authUser       = require('../controllers/get-auth-user.controller');
const updateUser     = require('../controllers/update-user.controller');
const addGame        = require('../controllers/add-game.controller');     
const getAllGames    = require('../controllers/get-all-games.controller');  
const getUserInfo    = require('../controllers/get-user-info.controller');
const requestGame    = require('../controllers/request-game.controller');
const retract        = require('../controllers/retract.controller');
const discardGame    = require('../controllers/discard.controller');


// Services
const searchGames = require('../services/games-search.service');

// CSP violation reports
router.use('/api/report-violation', (req, res, next) => {
  let cspReport = JSON.stringify(req.body) + '\n';
  fs.appendFile(path.join(__dirname, 'logs', 'csp-reports.log'), cspReport, 'utf8', (err) => {
    return next();
  });
});

// Signup
router.post('/api/signup', signup);

// Login
router.post('/api/login', login);

// Check if a given email is already registred
router.post('/api/email-is-used', emailIsUsed);

// Check if a given username is already registred
router.post('/api/username-is-used', usernameIsUsed);

// Get the authenticated user
router.get('/api/get-auth-user', authUser);

// Update user's info
router.post('/api/update-user', updateUser);


// Check jwt token
// Used for SPA authGuard
// This route is protected and can only be accessed if Authorization header is set && the token is valid
// If this endpoint is accessed then the user is authenticated and authorized to query ressources 
router.get('/api/verify-token', (req, res, next) => {
  res.json({errors: []});
});


// Search a game title, IGDB api call 
router.get('/api/search', (req, res, next) => {
  if(!req.query['query']) {
    return res.json({});
  }
  let searchTerm = validator.escape(req.query['query']);
  searchGames(searchTerm, (data) => {
    return res.json(data);
  });
});

// Add game to user's games collection
router.post('/api/add-game', addGame);

// Get all games
router.get('/api/games', getAllGames);

// Get user info
router.post('/api/get-user', getUserInfo);

// Request a game
router.post('/api/request-game', requestGame);

// Retract from a request
router.post('/api/retract', retract);

// Discard a game
router.post('/api/discard', discardGame);

module.exports = router;