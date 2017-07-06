var ClientOAuth2 = require('client-oauth2');
var http = require('http');
var express = require('express');
var app = express();
// var server = http.createServer(app);

var clientOauth2 = new ClientOAuth2({
	clientId: 'TPI_GrupoNro4',
	clientSecret: 'pass12345',
	accessTokenUri: 'http://130.211.183.120:8080/openam/oauth2/access_token',
	authorizationUri: 'http://130.211.183.120:8080/openam/oauth2/authorize',
	redirectUri: 'http://localhost:3000/callback',
	scopes: 'read',
	state: '8268745'
});

app.get('/', function (req, res) {
	// 1) RedirectLoginOauth2
	// http://130.211.183.120:8080/openam/oauth2/authorize?client_id=TPI_GrupoNro4
	// &redirect_uri=http://localhost:3000/callback&scope=read&response_type=code&state=8268745
	var uri = clientOauth2.code.getUri();
	console.log(uri);
	res.redirect(uri)
})

app.get('/callback', function (req, res) {
	// 2) RedirectASitioCallBack
	// /callback?code=58e2de56-c6e1-4161-a6ac-55ef038a95f3&scope=read&state=8268745
	console.log(req.originalUrl);
	// 3) SolicarAccessToken
	clientOauth2.code.getToken(req.originalUrl)
	.then(function (user) {
		console.log(user) 
      // We should store the token into a database. 
       // res.redirect('./index.html');
      return res.send(user.accessToken)
  })
})

// app.get('/', function (req, res) {
// 	res.send('Hello<br><a href="/auth">Log in with Openam</a>');
// });

// app.route('/article')
// .get(function(req, res) {
//     res.send('Get the article');
//     res.redirect('http://example.com');
// })

app.listen(3000);
// server.listen(3000);

