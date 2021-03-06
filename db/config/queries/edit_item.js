//  a query to edit itemsCollectionObject
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";



function updateItem(newItem, cb) {

  let client = new pg.Client(conString);
  client.connect();

  let queryStr = 'UPDATE items SET name=$2, description=$3, weight=$4, category=$5 WHERE p_id=$1 returning *';

  client.query(queryStr, [newItem.p_id, newItem.name, newItem.description, newItem.weight, newItem.category],
    function( err, res) {
      if(err) {
        console.log('there was an error updateing the thing', err );
        cb({
              msg: 'error updateing item in db',
              err: err
          })
      }
    //  console.log('updated item in db ', res)
      cb({
            msg: 'should have hopefully updated edited item in db',
            item: newItem
        })
      client.end()
    });
}

module.exports = updateItem;
