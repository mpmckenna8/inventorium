// express server to handle the db
var express  = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser')
var passport = require('passport');
const bcrypt = require('bcrypt')


var app      = express();
var port     = process.env.PORT || 8888;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();

}

app.use(cookieParser())


app.use(bodyParser.json()); // get information from html forms

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }

});



let LocalStrategy = require('passport-local').Strategy;

let user_login = require('./config/authenticate/user_login.js')
//console.log(user_login)

passport.use(new LocalStrategy({
      passReqToCallback: true,
      session: false
    },
    function(req, username, password, done) {
      // request object is now first argument
      // ...
      console.log('username', username)
      return user_login(username, password, (err, user_obj) => {
        return done(err, user_obj)

      })
    }
  ));

passport.serializeUser(function(user, done) {

  console.log('need to serialize user = ', user.u_id)
  done(null, user.u_id);
});

passport.deserializeUser(function(id, done) {
  //User.findById(id, function(err, user) {
    done(err, {user: id, password: 'pass'});
  //});
});

app.use(passport.initialize());

  // pass the app to config the routes in that file
require('./config/routes.js')(app, passport)



  app.listen(port);

console.log('express server listening on port ' + port);
