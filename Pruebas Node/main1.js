// var http = require('http');
// var express = require('express');
// var app = express();
// var httpServer = http.createServer(app);
// httpServer.listen(8080);

var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(index);
}).listen(8080);

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

var express  = require("express"),  
app      = express(),
http     = require("http"),
server   = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var router = express.Router();

// router.get('/', function(req, res) {  
// 	res.send("Hello World!");
// });

app.use(router);


app.listen(3000, function() {
	console.log("Node server running on http://localhost:3000");
});

