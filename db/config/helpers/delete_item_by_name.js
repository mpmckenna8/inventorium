// a query to help especially deleting the test item after tests are run.
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let queryString = "DELETE FROM items where name=$1"


let delete_item_by_name = (name, cb) => {

  let client = new pg.Client(conString);

  client.connect();

  client.query( queryString , [name], (err, res) => {
    if(err) {
      console.log('err deleting item with name = ', name);
      throw err;
    }
    console.log('item with name = ', name, ' deleted.')
    cb({msg:'test item should be deleted',
        itemName: name})
    client.end()
  })
}


module.exports = delete_item_by_name
