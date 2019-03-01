// add new user query.

let pg = require('pg');
var conString = "postgres://matthewmckenna@localhost/auth";


module.exports = function(email, password, callback) {
        var client = new pg.Client(conString);
        client.connect();

        console.log(email +' will be saved', password, ' = passowrd ');

            client.query('INSERT INTO users(email, name, password, inventory, inventoryquantity, inventorydescription) VALUES($1, $1, $2, $3, $4, $5) returning *', [email, password, "{}", "{}", "{}"], function (err, result) {
                if(err){
                    console.log(err);
                    client.end()
                    return callback(null);
                }
                console.log('result of inserting new user', result.rows[0]);
                client.end()
                //console.log(this.email);
                return callback({newUser:result.rows[0]});

            });

};
