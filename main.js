// 'use strict';

const express = require('express');
const app = express();

var credentials = {
  client: {
    id: 'TPI_GrupoNro4',
    secret: 'pass12345'
  },
  auth: {
    tokenHost: 'http://130.211.183.120:8080',
    tokenPath: '/openam/oauth2/access_token',
    authorizePath: '/openam/oauth2/authorize'
  }
};

var oauth2 = require('simple-oauth2').create(credentials);

var authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'read', // o read o notifications
  state: '8268745' //o callback? o  8268745 3(#0/!~
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

// Callback endpoint parsing the authorization token and asking for the access token
// app.get('/callback', function (req, res) {
//   var code = req.query.code;

//   OAuth2.AuthCode.getToken({
//     code: code,
//     redirect_uri: 'http://localhost:3000/callback'
//   }, saveToken);

//   function saveToken(error, result) {
//     if (error) {
//       console.log('Access Token Error', error.message, error);
//       res.json({'Access Token Error': error.message});
//     } else {
//             //see what we've got...
//             console.log(result);
//             //this adds the expiry time to the token by adding the validity time to the token
//             token = OAuth2.AccessToken.create(result);
//             //save the response back from the token endpoint in a session
//             req.session.token = result;

//             //perform the res of the processing now that we have an Access Token
//             gotToken(req,res);
//           }
//         }

//     //Now the token has been received and saved in the session, return the next page for processing
//     function gotToken(req, res) {
//       res.sendfile(__dirname +"/public/main.html");
//     };

//   });

app.get('/', function (req, res) {
  res.send('Hello<br><a href="/auth">Log in with Openam</a>');
});

app.listen(3000);
