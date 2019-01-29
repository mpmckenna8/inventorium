// query to add a new collection to db
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let add_collection_query = 'INSERT INTO packs(name, description, weight_capacity ) VALUES($1, $2, $3) RETURNING coll_id, name, weight_capacity, description';

let add_new_collection = function(collection, cb) {

  var client = new pg.Client(conString);
  client.connect();

  client.query( add_collection_query, [ collection.name, collection.description, collection.weight_capacity ], (err, res) => {
    if(err) {
      console.log('errer adding a new collection query, ', err);
      throw err
    }



    let add_res = {
      msg: "Sucessfully added collection to db",
      collection: res.rows[0]
    }
    
    cb( add_res )
    client.end()
  })

}

module.exports = add_new_collection;
