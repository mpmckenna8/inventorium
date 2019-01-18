// tests for the queries


let get_user_items_and_collections = require('../config/queries/get_user_items_and_collections.js')
let delete_user_item = require('../config/queries/delete_user_item.js')

 //get_user_items_and_collections('test', (inventory) => { //   console.log('test user inventory is: ', inventory) })

console.log('need to delete user item');
delete_user_item('boop', 2, (res) => {   console.log(res) })
