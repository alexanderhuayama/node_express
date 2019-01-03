'use strict';

const mongoose = require('mongoose');
const api = require('./app');
const http = require('http');
const server = http.createServer(api);

// Set port
api.set('port', process.env.PORT || 3000);

// Connect to database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(result => {
    // Start server
    server.listen(api.get('port'), () => {
      console.log(`Listening on http://localhost:${api.get('port')}`);
    });
  })
  .catch(error => console.log(error));
