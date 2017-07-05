// 'use strict';

const express = require('express');
const app = express();

var credentials = {
  client: {
    id: 'TPI_GrupoNro4',
    secret: 'pass12345'
  },
  auth: {
    tokenHost: 'https://130.211.183.120:8080/openam',
    tokenPath: 'oauth2/access_token',
    authorizePath: '/oauth2/auhtorize'
  }
};

var oauth2 = require('simple-oauth2').create(credentials);

var authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'read', // o read o notifications
  state: '3(#0/!~' //o callback? o  8268745 3(#0/!~
});

app.get('/auth', function (req, res) {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
    redirect_uri: 'http://localhost:3000/callback'
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res
      .status(200)
      .json(token);
  });
});

app.get('/', function (req, res) {
  res.send('Hello<br><a href="/auth">Log in with Openam</a>');
});

app.listen(3000);
