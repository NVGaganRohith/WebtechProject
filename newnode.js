var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/");
var nameSchema = new mongoose.Schema({
    username: String,
    Password: String
});
var User = mongoose.model("User", nameSchema);

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
/*
db1.collection("details").findOne(logind, function(err, result) {
    if (err) throw err;
    if (result["username"] === null && result["Password"] === null) {
        console.log("login unsuccess");
        return res.redirect('/');

    } else {
        console.log("login success");
        console.log(result);
        return res.redirect('success.html');
    }
});*/