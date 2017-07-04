var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('GET request to homepage');
});

app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});


app.listen(3000, () => {
  console.log('Express server started on port 3000'); // eslint-disable-line
});