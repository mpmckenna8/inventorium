// query to delete an item from a user inventory

let pg = require('pg');

let get_user_items = require('./get_user_items_and_collections.js')

let deleteUserItemQuery = "UPDATE users SET inventory=$2, inventoryquantity=$3 WHERE email=$1 returning *";

var conString = "postgres://matthewmckenna@localhost/auth";

const delete_user_item = function(email, p_id, cb) {

  get_user_items(email, (inventory) => {

    let updateInventory = inventory.map( d => d.p_id);
    let updateQuantities = inventory.map(d => d.quantity);

    let itemIndex = updateInventory.findIndex( d => d=== p_id)

    console.log('update inventory', updateInventory.length)

    updateInventory = updateInventory.filter( (d, i) => i !== itemIndex)
    updateQuantities = updateQuantities.filter( (d, i) => i !== itemIndex)

    console.log('update inventory', updateInventory.length)

    let client = new pg.Client(conString);
    client.connect();

    client.query(deleteUserItemQuery, [email, updateInventory, updateQuantities], (err,res) => {
      if(err) {
        console.log("error in delete user item query", err)
        throw err
      }
      cb(res)
      client.end()
    })

  })

}


module.exports = delete_user_item;
