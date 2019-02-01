// query to delete an item from a user inventory

let pg = require('pg');

let get_user_items = require('./get_user_items_and_collections.js')

let deleteUserItemQuery = "UPDATE users SET inventory=$2, inventoryquantity=$3 WHERE email=$1 returning *";


let userquerystring = 'SELECT * FROM users where name=$1 OR email=$1';

var conString = "postgres://matthewmckenna@localhost/auth";

const delete_user_item = function(email, p_id, cb) {

  let client = new pg.Client(conString);
  client.connect();

  client.query(userquerystring, [ email], (err, res) => {
    if(err) {
      console.log('err getting user items ', err)
    }

    let updateInventory = res.rows[0].inventory;
    let updateQuantities = res.rows[0].inventoryquantity;

    let itemIndex = updateInventory.findIndex( d => d === p_id)

    updateInventory = updateInventory.filter( (d, i) => i !== itemIndex)
    updateQuantities = updateQuantities.filter( (d, i) => i !== itemIndex)

//    console.log('update inventory', updateInventory.length)

    client.query(deleteUserItemQuery,
      [email, updateInventory,  updateQuantities],
      (err,res) => {
        if(err) {
          console.log("error in delete user item query", err)
          throw err
        }
        let delete_item_res = {
          msg: "delet_user_item sucessful",
          res: res
        }
        cb(delete_item_res)
        client.end()
      })
  })
}

delete_user_item('bebop', 251, (resp) => {  console.log('res deleting item', resp) })

module.exports = delete_user_item;
