// 'use strict';

const express = require('express');
const app = express();
// const credentials = {
//   client: {
//     id: '<client-id>',
//     secret: '<client-secret>'
//   },
//   auth: {
//     tokenHost: 'https://api.oauth.com'
//   }
// };

const credentials = {
  client: {
    id: 'TPI_GrupoNro4',
    secret: 'pass12345',
  },
  auth: {
    tokenHost: 'https://104.197.29.243:8080',
    tokenPath: '/openam/oauth2/access_token',
    authorizePath: '/openam/oauth2/authorize',
  }
};
// Initialize the OAuth2 Library 
const oauth2 = require('simple-oauth2').create(credentials);

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'read',
  state: '3(#0/!~', //o callback? o  8268745
});

// Redirect example using Express (see http://expressjs.com/api.html#res.redirect) 
// res.redirect(authorizationUri);
// Initial page redirecting to openam
app.get('/auth', (req, res) => {
  console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Get the access token object (the authorization code is given from the previous step).
// const tokenConfig = {
//   code: '<code>',
//   redirect_uri: 'http://localhost:3000/callback'
// };
// Callbacks 
// Save the access token 
// oauth2.authorizationCode.getToken(tokenConfig, (error, result) => {
//   if (error) {
//     return console.log('Access Token Error', error.message);
//   }
 
//   const token = oauth2.accessToken.create(result);
// });


// Promises 
// Save the access token 
// oauth2.authorizationCode.getToken(tokenConfig)
// .then((result) => {
//   const token = oauth2.accessToken.create(result);
// })
// .catch((error) => {
//   console.log('Access Token Error', error.message);
// });
// Callback service parsing the authorization token and asking for the access token
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

app.get('/success', (req, res) => {
  res.send('');
});

app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

app.listen(3000, () => {
  console.log('Express server started on port 3000'); // eslint-disable-line
});

// https://www.npmjs.com/package/simple-oauth2
// https://fhirblog.com/2014/06/29/a-simple-oauth-client/
// https://github.com/FredKSchott/simple-oauth2/blob/master/README.md
// http://expressjs.com/es/guide/using-middleware.html