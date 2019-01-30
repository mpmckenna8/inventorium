// to add items to collections

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function addItemToCollection(data, cb) {

  let client = new pg.Client(conString);
  client.connect();

  var itemInfo = [ parseInt(data.item.p_id), parseInt(data.item.quantity) ]
  let packId = parseInt(data.itemClass);

    let updateString = "UPDATE userpack SET items=items || $1 WHERE up_id=$2 returning items";

    client.query(updateString, [ [itemInfo], packId ],
      function(err, res) {
      if(err) console.log('err updating bag,', err)
      let add_item_res = {
        msg: "item added to collection succesfully",
        data: data
      }
      //  console.log('hopfully updated the userpack with new item', res);
        if(cb) {
          cb(add_item_res)
        }
        
        client.end();

  });
}

module.exports = addItemToCollection;
