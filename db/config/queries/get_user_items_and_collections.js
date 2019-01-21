// query to get user items and collections

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function get_user_items_and_collections( name, cb) {
  let userquerystring = 'SELECT * FROM users where name=$1 OR email=$1';
  let itemqueryString = 'SELECT * FROM items where p_id in (';
  let collectionQueryString =  'SELECT * FROM userpack where up_id = any ($1);';
;

  let client = new pg.Client(conString)

  client.connect();
  client.query(userquerystring, [ name ],function(err, res) {
    if(err) {
      console.log('error querying for users inventory')
      throw err
    }

    let inventory = res.rows[0].inventory.map((d, i) => {
      return {p_id: d, quantity: res.rows[0].inventoryquantity[i]}
    });
    let inventory_ids = res.rows[0].inventory
    let collection_ids = res.rows[0].userpacks;

    itemqueryString = itemqueryString + inventory_ids.toString() + ');'
//    console.log(itemqueryString)
    client.query(itemqueryString, (err,res) => {
      if(err) {
        console.log('error querying items for users inventory')
        throw err
      }

    //  console.log('res for items', res)

      let itemDetails = res.rows
      for( i in inventory ) {

        let itemdeets = itemDetails.find( (d) => d.p_id === inventory[i].p_id )
        itemdeets.quantity = inventory[i].quantity;
        inventory[i] = itemdeets;
      }

      console.log('collectionids', collection_ids)

      client.query(collectionQueryString, [collection_ids],function(err, res) {
        if(err) {
          console.log('there was an error querying for all collections', err)
          throw err;
        }

      //  console.log('all collections, hopefully', res.rows);
        let userCollections = res.rows;
        cb(inventory, userCollections)

        client.end();

      }


    )

    })
  })
}

module.exports = get_user_items_and_collections;
