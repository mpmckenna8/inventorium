// a query mainly clear the deatabase of collections created by tests


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let queryString = "DELETE FROM packs where name=$1"

let delete_collection = ( name, cb ) => {
  let client = new pg.Client(conString);

  client.connect();

  client.query( queryString , [name], (err, res) => {
    if(err) {
      console.log('err deleting item with name = ', name);
      throw err;
    }
    console.log('collection with name = ', name, ' deleted.')
    cb({msg:'collection item should be deleted',
        collection_name: name})
    client.end()
  })

}

module.exports = delete_collection;
