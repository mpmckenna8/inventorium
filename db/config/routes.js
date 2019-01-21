const delete_user_item = require('./queries/delete_user_item.js')
let get_all_items_collections = require('./queries/get_all_items_collections');
// routes for db backend to go here
module.exports = function(app) {

  app.get('/', function(req, res) {
    //  res.render('index.ejs'); // load the index.ejs file
    console.log('blah default thing')
    res.send('heyo');

  });

  app.post('/delete_user_item', function(req, res) {

  //  console.log('need to delete user item,', req.body)
    delete_user_item(req.body.user.email, req.body.item.p_id, (result) => {

      console.log('result.rows from deleting user item', result.rows)
      res.send(JSON.stringify({msg:'item maybe deleted'}))

    })
  })

  app.get('/all_items_collections', function(req, res) {
    console.log('sending all items and collections')
    var resData = {
      items:[],
      collections: []
    }
    get_all_items_collections( (items, collections) => {

      resData.items = items;
      resData.collections = collections;
      res.json(resData)

    })


  })

}
