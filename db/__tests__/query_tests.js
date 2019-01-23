// tests for the queries
let get_all_items_collections = require('../config/queries/get_all_items_collections.js');
let add_item = require('../config/queries/add_item.js')
let add_user_item = require('../config/queries/add_user_item.js')
let get_user_items_and_collections = require('../config/queries/get_user_items_and_collections.js')
let update_item_quantity = require('../config/queries/update_item_quantity.js')
let delete_user_item = require('../config/queries/delete_user_item.js')


let testItem =      { p_id: 151,
       name: 'sweet chili sauce',
       description: 'a sweet sauce good on lots of stuff',
       weight: 1,
       value: 4,
       category: 'comestible',
       quantity: 1
      };

let testUser = {
  name: 'bebop',
  u_id: 6,
  email: 'bebop'
}

add_item(testItem, (add_res) => {
   console.log('res from add_item, ', add_res)
})

//get_all_items_collections( (items, collections) => { console.log('all items = ', items, 'all collections, ', collections) })



 //get_user_items_and_collections('test', (inventory, collections ) => {   console.log('test user inventory is: ', inventory, 'collections = ', collections) })


//add_user_item( testItem, testUser, (res) => {  console.log('res from adding a user item', res.rows) })
//console.log('need to delete user item');

//update_item_quantity( testUser.name, testItem, (msg) => { console.log('result of updateing item quanity,', msg) })

//delete_user_item('test', 158, (res) => {   console.log('res from delete_user_item', res) })
