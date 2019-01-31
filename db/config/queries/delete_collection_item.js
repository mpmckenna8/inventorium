// a query for deleting an item from a user collection/ userpack
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


// removes all the items with the given item_id from the collection with the pack_id
function removeItemFromCollection(up_id, item_id, cb) {

  console.log('at least queriying ', up_id)

  let client = new pg.Client(conString);

  let selectUserpack = 'SELECT items FROM userpack where up_id=$1;';

  client.connect();

  client.query( 'SELECT items FROM userpack where up_id=$1;',
    [up_id],
    function(err, res) {
      if(err) {
        console.log('error with query to get userpacks', err)
        throw err;
      }
      let packitems = res.rows[0].items.filter(
        function(element, index, array) {
        console.log('item_id, element_id', item_id, element)
        return parseInt(element[0]) !==  parseInt(item_id)
      });


      let updateString = 'UPDATE userpack SET items=$1 where up_id=$2;';
      client.query(updateString, [packitems, up_id],
        function(err, res) {
          //console.log('should have deleted the item with id,', item_id);
          let removeItemRes = {
            msg: 'successfully removed item from user collection',
            item_id: item_id,
            up_id: up_id
          }
          if(cb) {
            cb(removeItemRes)
          }
          client.end();
      })
    })

}


//test call
/*
removeItemFromCollection(78, 3, (thinger) => {
  console.log('thing from removing item', thinger)
})
*/

module.exports = removeItemFromCollection;
