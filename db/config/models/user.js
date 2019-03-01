// model for user

let getUserInfo = require('../queries/get_user_info.js')
let addNewUser = require('../queries/add_new_user.js')
let User = function(
      name = "test user",
      email="test@test.com" ,
      password="",
      inventory=[]
) {
  let userObj = {
    name: name,
    email: email,
    password: password,
    inventory: inventory,
    save: saveUser,
    findOne: () => {
        return {msg:'user from db'}
    }
  }
  return userObj
}

function saveUser( cb ) {

  console.log('need to save user', this)
  let savingUser = this
  let userInfo = getUserInfo(this.name, (err, userinfo) => {
      console.log('userInfo is', userinfo, ', err = ', err);

      if( err.msg === 'user not found with given username') {
        // should be good to add new user
        if( this.name != '') {
          return addNewUser( savingUser.name, savingUser.password, (userDB) => {

            console.log('result of adding a new user', userDB)
            return cb(userDB)
          })

        }

      }
      else {
        console.log('there was a problem adding a new user')
      }


    })

}

function addNewUserToDB() {

  // check if user exists

}




module.exports = User;
