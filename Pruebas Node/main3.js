var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);
httpServer.listen(8080);

// app.get('/', function (req, res) {
//   res.send('GET request to homepage');
// });

// app.get('/user/:id', function (req, res, next) {
//   console.log('ID:', req.params.id);
//   next();
// }, function (req, res, next) {
//   res.send('User Info');
// });

// http.createServer(function (req, res) {
//   // res.writeHead(200, {'Content-Type': 'text/html'});
//   // res.write('Hello World!');
//   // res.end();
// }).listen(8080);

// app.listen(3000, () => {
//   console.log('Express server started on port 3000'); // eslint-disable-line
// });

