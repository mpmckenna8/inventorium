// a thing to check if a user can login_info
let get_user_info = require('../queries/get_user_info.js')

module.exports = (user_name, password, cb) => {
  console.log('user login should be going', user_name)
  // needs to return the user or null;
  return get_user_info( user_name, (err, user_obj) => {

    if(err) {
      return cb({msg:"user login failed"}, null)

    }
    if( user_obj.password === password) {
      return cb(err, user_obj)
    }
    else {
      return cb({msg:"user login failed"}, null)
    }
  } )

}
