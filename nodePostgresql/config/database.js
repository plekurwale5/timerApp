const { Client,types } = require('pg');
const config = require('../config.json');
const client = new Client({
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
    port: config.database.port,
    host: config.database.host,
    ssl: config.database.ssl
});
client.connect();
types.setTypeParser(1114, str => str);
module.exports.client=client ;
module.exports.users=function(){
    console.log("users")
    client.query("CREATE TABLE IF NOT EXISTS users (user_id SERIAL,firstname varchar(45) NOT NULL,lastname varchar(45) NOT NULL,email varchar(45) NOT NULL,password varchar(450) NOT NULL, PRIMARY KEY (user_id))", function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
    });
    };
module.exports.timers=function(){
    client.query("CREATE TABLE IF NOT EXISTS timerlist (t_id SERIAL,description varchar(450),user_id integer NOT NULL,start_time timestamp NOT NULL DEFAULT NOW(),duration Integer, PRIMARY KEY (t_id))" , function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
    });

}