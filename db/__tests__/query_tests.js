// tests for the queries
const assert = require('assert')
let test = require('tape')

let get_all_items_collections = require('../config/queries/get_all_items_collections.js');

// tested
let add_item = require('../config/queries/add_item.js')
let edit_item = require('../config/queries/edit_item.js')
let add_user_item = require('../config/queries/add_user_item.js')

// not tested
let get_user_items_and_collections = require('../config/queries/get_user_items_and_collections.js')

// not connected to frontend
let add_new_collection = require('../config/queries/add_new_collection.js')
let add_new_user_collection = require('../config/queries/add_new_user_collection.js')

let update_item_quantity = require('../config/queries/update_item_quantity.js')
let delete_user_item = require('../config/queries/delete_user_item.js')
let delete_collection_item = require('../config/queries/delete_collection_item.js')
let delete_user_collection = require('../config/queries/delete_user_collection.js')
// collection things
let add_item_to_collection = require('../config/queries/add_item_collection.js')
let update_collection_item_quantities = require('../config/queries/update_collection_quantities.js')

let delete_item_by_name = require('../config/helpers/delete_item_by_name.js')
let delete_collection = require('../config/helpers/delete_collection_by_name.js');

let testItem =      { p_id: 232,
       name: 'test thing Itemer',
       description: 'a sweet sauce good on lots of stuff',
       weight: 1,
       value: 4,
       category: 'other',
       quantity: 17
      };

let testUser = {
  name: 'bebop',
  u_id: 1,
  email: 'bebop'
}


test('Test for basic calls to get all items and user items', (t) => {

  get_user_items_and_collections(testUser.name, (user_res) => {
  //  console.log('res for gettin guser items and collections.', user_res)
    t.ok(user_res.msg = "sucess getting user collection", "Gettting user items and collections." );
      t.end()
  })

})




test("tests for all the items", (t) => {
  add_item(testItem, (add_res) => {
  //  console.log('res from add_item, ', add_res);
    testItem.p_id = add_res.p_id;
    t.ok( testItem.p_id !== 0, "a test item added to the item table")
    testItem.name = 'testyItemer'
    edit_item( testItem, ( editedItemjson ) => {
      //console.log('edited item json = ', editedItemjson)
      t.ok( editedItemjson.msg === "should have hopefully updated edited item in db", "edited the item in items table.")
      add_user_item( editedItemjson.item , testUser, (res) => {
        let test_inventory = res.rows[0].inventory
          //console.log('res from adding a user item',res.rows[0].inventory, res.rows[0].inventory.find( (d) => d === editedItemjson.item.p_id) )
        t.ok( res.rows[0].inventory.find( (d) =>
          d === editedItemjson.item.p_id) !== undefined, "Item added to user inventory"
        )
        testItem.quantity = 1010;
        // now need to delete the user item or maybe change quantity and stuff
        update_item_quantity( testUser.name, testItem, (msg) => {
          //console.log('result of updateing item quanity,', msg)
          let updated_item = msg.item;
          testItem = updated_item;
          t.ok( msg.item.quantity === 1010, "Quantity for a user item succesfully updated.")
          // now need to delete user item;
          collectionTests();
          t.end()
      })
    })
    })
  })
})


function clear_test_items() {

  test("Clearing the db of test items and collections", (t) => {

    delete_user_item(testUser.name, testItem.p_id, (del_user_item_res) => {
//            console.log('res from delete_user_item', res)
      let itemInInventory = del_user_item_res.res.rows[0].inventory.find( d => {
          return d === testItem.p_id;
      })
      t.ok( itemInInventory == undefined , 'item deleted from user inventory.')
      // still need to just generally delete the item from the db.
      delete_item_by_name(testItem.name, (end_res) => {
        t.ok( end_res.msg === "test item should be deleted", 'test item should be successfully removed ')
//              console.log('should have done all the item tests and deleted the test item', end_res)
        t.end()
      })
    })

  })

}



let test_collection = {
  name: "test collection",
  description: "collection for testing",
  weight_capacity: 3.2,
  userDescription: "test user collection"
}

let newUserCollectionData = {
  collection:test_collection,
  user: testUser
}


function collectionTests() {

  test("testing colletion queries ", (t) => {
    add_new_collection( test_collection, (new_coll_res) => {
      console.log('new collection added result is, ', new_coll_res);
      t.ok(new_coll_res.msg === "Sucessfully added collection to db", "added collection to db" )
      add_new_user_collection( newUserCollectionData, (new_user_coll_res) => {

        console.log('result of adding new user collection = ', new_user_coll_res)

        let addItemToCollection = {
            item: testItem,
            itemClass: new_user_coll_res.up_id
          }

          add_item_to_collection(addItemToCollection, (add_item_json) => {
            console.log( 'add item to json', add_item_json )

            let item_collection = add_item_json.data.item;
            let up_id = add_item_json.data.itemClass
            delete_collection_item(up_id, item_collection.p_id,
              (del_col_item_res) => {
                console.log('should have deleted item added to the collection', del_col_item_res)
                delete_collection( test_collection.name, (del_res) => {
                  console.log('successfully deleted collection', del_res)
                  t.end()
                  clear_test_items()
                })
              });

      })


    })
  })

  })
}


/*
test("test for the Collections", (t) => {

  update_collection_item_quantities(51, testItem, (update_json) => {

    t.ok(update_json.msg === "quantity should be updated", "item in collection update.")

    t.end()
  })
})
*/





//add_user_item( testItem, testUser, (res) => {  console.log('res from adding a user item', res.rows) })
//console.log('need to delete user item');
