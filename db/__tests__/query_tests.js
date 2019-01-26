// tests for the queries
let get_all_items_collections = require('../config/queries/get_all_items_collections.js');

// tested
let add_item = require('../config/queries/add_item.js')
let edit_item = require('../config/queries/edit_item.js')
let add_user_item = require('../config/queries/add_user_item.js')

// not tested
//let get_user_items_and_collections = require('../config/queries/get_user_items_and_collections.js')
let update_item_quantity = require('../config/queries/update_item_quantity.js')
let delete_user_item = require('../config/queries/delete_user_item.js')

let delete_item_by_name = require('../config/helpers/delete_item_by_name.js')


let testItem =      { p_id: 10001,
       name: 'test thing Itemer',
       description: 'a sweet sauce good on lots of stuff',
       weight: 1,
       value: 4,
       category: 'other',
       quantity: 1
      };

let testUser = {
  name: 'test',
  u_id: 1,
  email: 'test'
}




add_item(testItem, (add_res) => {
  console.log('res from add_item, ', add_res);
  testItem.p_id = add_res.p_id;

  testItem.name = 'testyItemer'
  edit_item( testItem, ( editedItemjson ) => {

    console.log('edited item json, ', editedItemjson)
    add_user_item( editedItemjson.item , testUser, (res) => {
      console.log('res from adding a user item', res.rows)
      // now need to delete the user item or maybe change quantity and stuff
      update_item_quantity( testUser.name, testItem, (msg) => {
        console.log('result of updateing item quanity,', msg)
        let updated_item = msg.item;
        // now need to delete user item;
        delete_user_item(testUser.name, updated_item.p_id, (res) => {
          console.log('res from delete_user_item', res)

          // still need to just generally delete the item from the db.
          delete_item_by_name(updated_item.name, (end_res) => {
            console.log('should have done all the item tests and deleted the test item', end_res.rows)
          })
        })
    })

  })

  })

})




//delete_user_item('bebop', 141, (res) => {   console.log('res from delete_user_item', res.rows) })


//get_all_items_collections( (items, collections) => { console.log('all items = ', items, 'all collections, ', collections) })



 //get_user_items_and_collections('test', (inventory, collections ) => {   console.log('test user inventory is: ', inventory, 'collections = ', collections) })


//add_user_item( testItem, testUser, (res) => {  console.log('res from adding a user item', res.rows) })
//console.log('need to delete user item');

//update_item_quantity( testUser.name, testItem, (msg) => { console.log('result of updateing item quanity,', msg) })

//delete_user_item('test', testItem, (res) => {   console.log('res from delete_user_item', res) })
