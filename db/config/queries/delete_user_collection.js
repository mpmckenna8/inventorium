// a query to delete a user collection

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let queryString = "select * from users where u_id=$1"

let updateString = 'UPDATE users SET userpacks=$1 where u_id=$2';

let deleteuserpack = "DELETE FROM userpack WHERE up_id=$1"

// Delects the bag from the user table and userpack table

function delete_user_collection(u_id, upid, cb) {

    let client = new pg.Client(conString);
    let userId = u_id;
    if(typeof u_id !== "string" ) {
      userId = userId.toString();
    }

    console.log('shoule be deleting a bag for u_id = ', u_id, 'userbag upid = ', upid )

    if(upid  || upid ===0) {

    client.connect();
    client.query(queryString, [userId], function(err, res) {
      var userpacks = res.rows[0].userpacks;
      let packIndex = userpacks.findIndex(function(d) {
        console.log(d)
        return (d.toString() === upid.toString());
      })

      userpacks.splice(packIndex, 1);
    //  console.log('packindex = ', packIndex, userpacks);
      client.query(updateString, [userpacks, userId], function(err, res) {
        if(err) {
          console.log('error deleting a user bag, ', err)
        }
        console.log('userpacks should be updated.')
        client.query(deleteuserpack, [upid], function(err, res) {
          if(err) {
            console.log('error deleting userbag row from userpacks, ', err)
            if(cb) {
            cb(err, null);
            }
          }

          let delete_user_collection_res = {
            msg: "Sucessfully deleted user item",
            res: res,
            err:err,
            u_id: u_id,
            up_id: upid
          }
          if(cb) {
            cb( delete_user_collection_res )
          }
          client.end()
          console.log('pack ', upid, " should be deleted.")
        })
      })
    })
  }
  else {
    console.log('there was nothing found for the user id! ')
    cb({err:"no user id"}, {err:"no user id"})
  }


}

// delete_user_collection( 6, 80)

module.exports = delete_user_collection;
