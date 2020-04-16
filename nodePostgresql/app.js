const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const {users,timers} = require('./config/database');
const config = require('./config.json');
var cors = require('cors');
var allowedOrigins = ['http://127.0.0.1:4200','http://localhost:4200',];

var user = require('./routes/user'); 
var timerlist = require('./routes/timerlist'); 
var app = express();
app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }))
// app.set('port', process.env.PORT || config.port || 4000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.put('/user/register', user.add);
app.put('/user/login', user.login);
app.put('/timer', timerlist.add);
app.post('/timer', timerlist.update);
app.put('/timer/list', timerlist.list);
app.post('/timer/delete', timerlist.delete);

app.listen(config.app_port , function () {
    console.log('Server is running.. on Port'+config.app_port );
    users();
    timers();
});