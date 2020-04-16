const { client } = require('../config/database');
exports.login = function (req, res) {
    client.query('SELECT * FROM users Where email=$1 and password=$2 ',[req.body.email,req.body.password] ,function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.json( { title: "users", data: result.rows });
    });
};
exports.add = function (req, res) {
    console.log(req.body)
    var cols = [req.body.firstname, req.body.lastname, req.body.email, req.body.password];
    client.query('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.json({data:result.rows})
    });
    // res.json({ title: "Add users","request":JSON.stringify(req)  });
};
/* exports.edit = function (req, res) {
    var id = req.params.id;
     client.query('SELECT * FROM users WHERE id=$1', [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.json({ title: "Edit users", data: result.rows });
    });
};
exports.save = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone];

    client.query('INSERT INTO users(name, address, email, phone) VALUES($1, $2, $3, $4) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.redirect('/userss');
    });

}; */
/* 
exports.update = function (req, res) {

    var cols = [req.body.name, req.body.address, req.body.email, req.body.phone, req.params.id];

    client.query('UPDATE users SET name=$1, address=$2,email=$3, phone=$4 WHERE id=$5', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
        res.redirect('/userss');
    });
};
exports.delete = function (req, res) {
    var id = req.params.id;
    client.query("DELETE FROM users WHERE id=$1", [id], function (err, rows) {
        if (err) {
            console.log("Error deleting : %s ", err);
        }
        res.redirect('/userss');
    });
};
 */