// adds a new collection for a user to a table

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


let updatePacksString = 'INSERT INTO userpack(packtype, name, items) VALUES($1, $2, $3) returning *'


let updateUserString = 'UPDATE users SET userpacks=array_append(userpacks, $1) where name=$2;'

function addUserCollection(data, cb) {
  let client = new pg.Client(conString);
  client.connect();
  let userName = data.user.name;

  client.query(updatePacksString, [data.collection.coll_id, data.collection.userDescription, []],
  (err,res) => {
    if(err) {
      console.log('error adding userpack to username. ', err)
    }

    console.log('tring to update userpacks, res.rows[0] = ', res.rows[0])

    let add_user_collection_res = {
      res: res,
      msg:"Sucess adding a user collection to userpacks table.",
      data: data
    }



        if(res ) {
          let bag_id = res.rows[0].up_id;
          client.query(updateUserString, [bag_id, userName],
            (err, res) => {

                if(err) throw err;
                client.end();
                add_user_collection_res.up_id = bag_id
                cb(add_user_collection_res )
            })
        }
        else {

          add_user_collection_res.msg = "Something went wrong adding the user collection"
          cb(add_user_collection_res)
          console.log('sorry there was no bag associated with this user.')
          client.end();

        }

      }



  )

}

module.exports = addUserCollection;
