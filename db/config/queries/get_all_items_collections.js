// query to get all items and collections

let itemsQueryString = "SELECT * FROM items;"
let collectionsQueryString = 'SELECT * FROM packs;';

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let get_all_items_collections = function(cb) {


    let client = new pg.Client(conString);
    client.connect();

  client.query(itemsQueryString, function(err, res){
    if(err){
      console.log('error with the db query for all items', err)

      throw err;
    }
  //  console.log('all items should be ', res.rows)

    let items = res.rows;

    client.query(collectionsQueryString, function(err, res){
      if(err) {
        console.log('err querying for all collections', err)
        throw err
      }
      let collections = res.rows;

      cb( items, collections )
      client.end()
    })

  })

}

module.exports = get_all_items_collections;
