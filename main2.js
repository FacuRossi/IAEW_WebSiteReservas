var request = require('request');   //https://github.com/mikeal/request
var path = require('path');
var express = require('express'),
    app = express();
 
// // app.use(express.cookieParser());
// app.use(express.session({secret: '1234567890QWERTY'}));
// app.use(express.static(path.join(__dirname, 'public')));
 
var OAuth2;
 
var credentialsGoogle = {
    clientID: "<myclientid>",
    clientSecret: "<mysecret>",
    'site': 'https://accounts.google.com/o/oauth2/',
    'authorizationPath' : 'auth',
    'tokenPath' : 'token'
};
 
// Initial call redirecting to the Auth Server
app.get('/auth', function (req, res) {
    OAuth2 = require('simple-oauth2')(credentialsGoogle);
    authorization_uri = OAuth2.AuthCode.authorizeURL({
        redirect_uri: 'http://localhost:3001/callback',
        scope: 'openid email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/tasks',
        state: '3(#0/!~',
        access_type: "offline"      //causes google to return a refresh token
    });
 
    res.redirect(authorization_uri);
});
 
// Callback endpoint parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
    var code = req.query.code;
 
    OAuth2.AuthCode.getToken({
        code: code,
        redirect_uri: 'http://localhost:3001/callback'
    }, saveToken);
 
    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message, error);
            res.json({'Access Token Error': error.message});
        } else {
            //see what we've got...
            console.log(result);
            //this adds the expiry time to the token by adding the validity time to the token
            token = OAuth2.AccessToken.create(result);
            //save the response back from the token endpoint in a session
            req.session.token = result;
 
            //perform the res of the processing now that we have an Access Token
            gotToken(req,res);
        }
    }
 
    //Now the token has been received and saved in the session, return the next page for processing
    function gotToken(req, res) {
        res.sendfile(__dirname +"/public/main.html");
    };
 
});
 
//get the lists for the current user...
app.get("/tasks", function (req, res) {
    //Need a token to access the google services
    if (req.session.token) {
        var AT = req.session.token["access_token"];
        var url = "https://www.googleapis.com/tasks/v1/users/@me/lists";
 
        var options = {
            method: "GET",
            headers: {
                "content-type": "application/json+fhir",
                "authorization": "Bearer " + AT
            },
            rejectUnauthorized: false,      //to allow self-signed cetificates
            uri: url
        };
 
        request(options, function (error, response, body) {
            res.json(body);
        });
    } else {
        res.json({err:"Not logged in"});
    }
 
});
 
app.listen(3001);
 
console.log("OAuth Client started on port 3001");