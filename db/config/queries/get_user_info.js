// a query to get user info primarily to login

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

module.exports = function(user_name, cb) {
  let userquerystring = 'SELECT * FROM users where name=$1 OR email=$1';

  let client = new pg.Client(conString);

  client.connect();
  client.query(userquerystring, [user_name], (err, res) => {
    if(err) {

      console.log('error querying for user info')
    }
    let userInfo = res.rows[0]
    console.log('userInfo = ', userInfo)
    if( ! userInfo ) {
      console.log('no userinfo thing')
      return cb( {msg: "user not found with given username"}, userInfo)
    }
    else {
      return cb(err, userInfo)
    }
  })
}
