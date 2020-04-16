const { client } = require('../config/database');

exports.list = function (req, res) {
    client.query('SELECT * FROM timerlist Where user_id=$1 ',[req.body.user_id] ,function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.json( { title: "timerlists", data: result.rows });
    });
};
exports.add = function (req, res) {
    var cols = [req.body.description, req.body.user_id];
    client.query('INSERT INTO timerlist(description, user_id) VALUES($1, $2) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.json({data:result.rows});
    });

    // res.json({ title: "Add timerlist"  });
};
exports.update = function (req, res) {
    var cols = [req.body.description, req.body.duration, req.body.t_id];
    client.query('UPDATE timerlist SET description=$1, duration=$2 Where t_id=$3 RETURNING *' , cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        if(result==null||result==undefined||result.rows==null||result.rows==undefined)
            result={rows:[]};
        res.json({data:result.rows});
    });
    // res.json({ title: "Add timerlist"  });
};
exports.delete = function (req, res) {
    var id = req.body.t_id;
    var user_id = req.body.user_id;
    client.query("DELETE FROM timerlist WHERE t_id=$1 and user_id=$2", [id,user_id], function (err, data) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.json(data.rows);
    });
};