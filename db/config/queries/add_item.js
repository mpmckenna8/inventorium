// query to add new item to the items table

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let add_item_query = 'INSERT INTO items(name, description, weight, category ) VALUES($1, $2, $3, $4) RETURNING p_id';

let add_item = function(item, cb) {

  var client = new pg.Client(conString);
  client.connect();

  client.query(add_item_query, [item.name, item.description, item.weight, item.category], (err, res) => {

    if(err) {
      console.log('err adding a new item to the db.', err)
      throw err;
    }
    cb(res.rows[0]);
    client.end();
  })

}

module.exports = add_item;
