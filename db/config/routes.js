const delete_user_item = require('./queries/delete_user_item.js')
// routes for db backend to go here
module.exports = function(app) {

  app.get('/', function(req, res) {
    //  res.render('index.ejs'); // load the index.ejs file
    console.log('blah default thing')
    res.send('heyo');

  });

  app.post('/delete_user_item', function(req, res) {

    console.log('need to delete user item,', req.body)
    delete_user_item(req.body.user.email, req.body.item.p_id, (result) => {

      console.log('result.rows from deleting user item', result.rows)
      res.send(JSON.stringify({msg:'item maybe deleted'}))

    })
  })

}
