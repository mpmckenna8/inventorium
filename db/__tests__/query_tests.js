// tests for the queries

let add_user_item = require('../config/queries/add_user_item.js')
let get_user_items_and_collections = require('../config/queries/get_user_items_and_collections.js')
let delete_user_item = require('../config/queries/delete_user_item.js')

let testItem =      { p_id: 151,
       name: 'testItemer',
       description: 'item for testing',
       weight: 2,
       value: null,
       category: 'other',
       quantity: 2
      };

let testUser = {
  name: 'bebop',
  u_id: 6,
  email: 'bebop'
}

 //get_user_items_and_collections('test', (inventory) => { //   console.log('test user inventory is: ', inventory) })


//add_user_item( testItem, testUser, (res) => {  console.log('res from adding a user item', res.rows) })
//console.log('need to delete user item');


delete_user_item('test', 158, (res) => {   console.log('res from delete_user_item', res) })
