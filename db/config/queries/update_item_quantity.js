// a query to update the an itme quantity

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let queryString = "select * from users where name=$1 or email=$1"



let update_item_quantity = (userName, item, cb) => {

  let client = new pg.Client(conString);

  client.connect();
  client.query(queryString, [userName], function(err, res) {
    if(err) {
      console.log('error updating qunat', err)
      throw err
    }

    let userinfo = res.rows[0];

    var userInventory = userinfo.inventory;
    let itemIndex = userInventory.findIndex(function(d) {
      //  console.log(d)
      return (d === item.p_id);
    })

    let inventoryQuants = res.rows[0].inventoryquantity;

    inventoryQuants[itemIndex] = item.quantity;

    let updateString = 'UPDATE users SET inventoryquantity=$1 where name=$2 OR email=$2 returning inventoryquantity';

    client.query(updateString, [inventoryQuants, userName ], function(err, res) {
      if(err) {
        console.log('error updating qunat', err)
        throw err
      }

    //    console.log('should have updated item quantity its now', res.rows[0].inventoryquantity[itemIndex]);
      cb({msg: 'update should be successful', item: item})
      client.end();

    })


  })

}

module.exports = update_item_quantity;
