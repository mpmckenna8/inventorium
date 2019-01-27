let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

function update_colletion_item_quantities( collection_id, item, cb ) {

  let client = new pg.Client(conString);

  let selectUserpack = 'SELECT * FROM userpack where up_id=$1';
  let updateString = 'UPDATE userpack SET items=$1 where up_id=$2';

  client.connect();

  client.query( selectUserpack, [collection_id], (err, res) => {
    console.log('userpack back', res.rows[0])
    if(err) {
      console.log('err querying for userpack', err)
    }

    let packItems = res.rows[0].items;
    for( i of packItems) {
      if( i[0] === item.p_id ) {
        i[1] = item.quantity;
      }
    }

    client.query( updateString, [packItems, collection_id], (err, update_res) => {
      if(err) throw err;
      let update_response = {
        msg: "quantity should be updated",
        item: item,
        collection_id: collection_id,
        db_res: update_res
      }
      cb(update_response)
      client.end();

    } )
  })


}

// example using it!
/*

editUserPackQuantity(51, {p_id:3, quantity: 100 }, (resp) => {
  console.log('res from updateing item in collection quantity, ', resp)
} )

*/


module.exports = update_colletion_item_quantities;
