const https = require('https');
const querystring  = require('querystring');  

module.exports = function(searchTerm, callback) {
  
  const searchQuery = querystring.stringify({
    search: searchTerm,
    limit: 20,
    offset: 0,
    fields: 'name,url,summary,cover.url'
  })

  const auth = process.env.IGDB_KEY;

  const options = {
    hostname: 'igdbcom-internet-game-database-v1.p.mashape.com',
    port: 443,
    path: '/games/?' + searchQuery,
    method: 'GET',
    headers: {
      'X-Mashape-Key': auth,
      'Accept': 'application/json'
    }
  }

  https.get(options, (res) => {
    
    let data = '';
    
    res.setEncoding('utf8');
    
    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      return callback(JSON.parse(data));
    });
  });
}
