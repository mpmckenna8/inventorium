let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let setCollectionQuantitiesToZero = "UPDATE userpack SET items=$2 where up_id=$1 returning items";

let selectUserpack = 'SELECT * FROM userpack where up_id=$1';


module.exports = function(options = {mode:"setToZero"}, up_id, cb) {
  let client = new pg.Client(conString);

  client.connect();


  if( options.mode === "setToZero") {
    client.query(selectUserpack, [up_id], function(err, res) {
      if(err) {
        cb(err, res)
        throw err
      }
      console.log('should have set quantities to zero.')
      let itemsArray = res.rows[0].items;

      for(let o = 0; o < itemsArray.length; o++) {
        itemsArray[o][1] = 0;
      }
      console.log('items should be zeroed', itemsArray);
      client.query(setCollectionQuantitiesToZero,
        [up_id, itemsArray], function(err, res) {
          if(err) {
            cb(err, res)
            throw err
          }
          client.end()
          cb(err, res.rows[0])
        })
    })

  }
  else if( options.mode === "emptyArray") {

    console.log('should be clearing all items')
    client.query(setCollectionQuantitiesToZero,
      [up_id, [] ],
      function(err, res) {
        if(err) {
          cb(err,res)
          throw err;
        }

      client.end()
      console.log('items should be cleared from userpack: ', up_id)
      cb(err, res.rows[0])

    })
  }
}
