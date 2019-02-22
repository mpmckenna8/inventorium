

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
        return {'user from db'}
    }
  }
  return userObj
}

function saveUser() {

  console.log('need to save user', this)
}


module.exports = User;
