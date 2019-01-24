// pg query to add a new item for a user

let pg = require('pg');
var conString = "postgres://matthewmckenna@localhost/auth";

let queryStr = 'UPDATE users SET inventory=array_append(inventory, $2), inventoryquantity=array_append(inventoryquantity, $3) WHERE email=$1   RETURNING *';


const add_user_item = function(item, user, cb) {
  let client = new pg.Client(conString);
  client.connect();

  client.query(queryStr, [user.email, item.p_id, item.quantity],
  function( err, res) {
    if(err) { console.log('there was an error updateing the thing', err )
      throw err
    }

    console.log('updated userinventory in db ', res.rows[0])

    cb(res)
  //  console.log('updated userinventory in db ', res.rows)

    client.end();
  });

}

module.exports = add_user_item;
