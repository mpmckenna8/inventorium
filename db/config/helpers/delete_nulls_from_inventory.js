// need to remove null values from a users inventory so things work again.

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

function deletenulls(user_name) {

  let client = new pg.Client(conString);

  client.connect();
  let queryString = "select * from users where name=$1"

  client.query(queryString, [user_name], function(err, res) {
    if(err) {
      console.log('error updating qunat', err)
      throw err
    }
    let userinfo = res.rows[0];
    var userInventory = userinfo.inventory;
    let inventoryQuants = userinfo.inventoryquantity;

    let itemIndex = userInventory.findIndex(function(d) {
      //  console.log(d)
      return (d === null);
    })
    console.log('item index of null to be deleted = ', userInventory)

    userInventory.splice(itemIndex,1)
    inventoryQuants.splice(itemIndex,1)
    console.log('item index of null to be deleted = ', userInventory)
    let updateString = 'UPDATE users SET inventory=$3, inventoryquantity=$1 where name=$2 OR email=$2 returning inventoryquantity';
    client.query(updateString, [inventoryQuants, user_name, userInventory ], function(err, res) {
      if(err) {
        console.log('error updating qunat', err)
        throw err
      }
      console.log('should have removed all nulls!')
      client.end()

    })
  })

}

deletenulls('test')
