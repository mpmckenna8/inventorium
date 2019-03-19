const delete_user_item = require('./queries/delete_user_item.js')
let get_all_items_collections = require('./queries/get_all_items_collections');

let get_user_items_and_collections = require('./queries/get_user_items_and_collections.js');

let add_user_item = require('./queries/add_user_item.js')
let add_item = require('./queries/add_item.js')
let edit_item = require('./queries/edit_item.js')
let add_new_user_collection = require('./queries/add_new_user_collection.js')
let add_item_to_collection = require('./queries/add_item_collection.js')

let update_item_quantity = require('./queries/update_item_quantity.js')
let update_collection_item_quantities = require('./queries/update_collection_quantities.js')

let empty_user_collection = require("./queries/empty_user_collection.js");


let User = require('./models/user.js')

// routes for db backend to go here
module.exports = function(app,passport) {

  app.get('/', function(req, res) {
    //  res.render('index.ejs'); // load the index.ejs file
    console.log('blah default thing')
    res.send('heyo');
  });



  app.get('/items/*', function(req, res) {

    let userName = req.url.split('/')[2];
    get_user_items_and_collections( userName, (items_collections_res) => {
      console.log('sending user items and collections');
      res.json(items_collections_res)
    })

  })




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


  app.post('/add_user_item', function( req, res) {
    console.log('req for add user item, ', req.body)
    let item = req.body.item;
    let user = { email: req.body.user.name };

    add_user_item(item, user, (dbRes) => {
      console.log('added user item ', dbRes.rows);
      res.json(dbRes.rows)
    } )
  })

//
app.post('/items/editquant', function(req, res) {

  let editItem = req.body.item;
  let userName = req.body.user;
  let onCollection = req.body.collection

  if( onCollection !== 'all' ) {
    console.log('need to update a specific collection quantity')
    update_collection_item_quantities(onCollection, editItem, (update_collection_quantities_response) => {
      res.json( update_collection_quantities_response )
    })
  }
  else {
    update_item_quantity(userName, editItem, ( msg ) => {
      res.json({msg: msg.msg})
    })
  }
})

app.post('/items/add', function(req, res) {

  let req_item = req.body.item;
  let userName = req.body.userName;
  add_item( req_item, (add_res) => {
//    console.log('add_res = ', add_res)
    req_item.p_id = add_res.p_id;

    add_user_item(req_item, {email: userName}, (add_user_item_res) => {
      res.json( { data: { newItem: req_item,
                          item_id:req_item.p_id,
                          msg:'successfully added item to items table and users inventory'
                        }
                }
              )
      })
    })
  })

  app.post('/items/edit', function(req, res) {
    let req_item = req.body;
    console.log('item to be edited, ', req_item);
    edit_item( req_item , (edit_json) => {
      res.json( edit_json )
      })
  })



// adds a new usercollection to the userpacks thing
  app.post('/usercollection/add', function(req, res) {
  let data = req.body;
  console.log('need to add a user collectio in db using data = ', data)
    add_new_user_collection(data, function(add_coll_res ) {
      console.log('add collection res = ', add_coll_res)

      res.send(JSON.stringify(add_coll_res))
    })
  })

  app.post('/items/addtocollection', function(req, res) {
    let data = req.body;

    add_item_to_collection(data, (add_item_json) => {
      res.json(add_item_json)
    })

  })

  app.post('/login', function(req, res, next) {

    passport.authenticate('local',
     function(err, user, info) {
       // If this function gets called, authentication was successful.
       // `req.user` contains the authenticated user.
      // console.log('auth supposed success for', req.user )

    //  console.log('maybe auth worked for ,', user)
      console.log('err = ', err)
    //  console.log('user = ', user)
      if(user){
        console.log('there is a user and they were authenticated!')
        return res.send(JSON.stringify({msg:'logged in good',
        user: user}));
      }
      else {
        console.log('no user')
        return res.send(JSON.stringify({msg: 'login fail'}))
      }
    }) (req, res, next)
  }
);

app.post('/signup', (req, res) => {
  let reqUser = req.body
  let possibleUser = new User(reqUser.name,reqUser.name, reqUser.password)

  console.log('trying to save', possibleUser)
  possibleUser.save( (userthing) => {

    console.log('maybe a new user has been done', userthing)
    res.send(JSON.stringify( {msg: "signing up user", userInfo: userthing} ))

  })
})

app.post('/emptycollection/*', (req, res) => {
  let req_data = req.body
  console.log('data for empty collection', req_data)
  empty_user_collection( {mode: req_data.options}, req_data.uc_id, ( err, db_res) => {

    res.send(JSON.stringify( {msg:"emptying collection", data: db_res} ))

  })


})

}
