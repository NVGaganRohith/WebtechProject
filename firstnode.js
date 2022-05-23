const express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
console.log(MongoClient);
var url = "mongodb://localhost:27017/";
var cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
var data;
var db1;
var session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('path'));
app.use('/Et.png', express.static('Et.png'));
app.use('/bmi__WHO.jpg', express.static('bmi__WHO.jpg'));
app.use('/app1.js', express.static('app1.js'));
app.use('/loading.gif', express.static('loading.gif'));
app.use(bodyParser.urlencoded({
    extended: true
}));



MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db1 = db.db("credentials");
    console.log("Database Connected");
});

const store = new MongoDBSession({
    uri: url + "sessions",
    collection: "mysessions",
});

app.use(cookieParser());
app.use(session({
    secret: "1a2b3c",
    resave: false,
    saveUninitialized: false,
    store: store
}));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/loginpage.html');
    }
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Start_page.html'));
});

app.get('/loginpage.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/loginpage.html"));
});

app.get('/relogin.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/relogin.html"));
});

app.post('/login_Page', function(req, res) {
    console.log("req", req)
    var loginData = { username: req.body.uname, Password: req.body.pname };
    db1.collection('details').findOne(loginData, function(err, result) {
        if (err) throw err;
        if (result != null) {
            req.session.isAuth = true;
            if (loginData.username == "saibhargav" && loginData.Password == "satyasai") {
                return res.redirect('adminpage.html');
            }
            return res.redirect('success.html');
        } else {
            res.redirect('relogin.html');
        }

    });

});


app.get('/regis.html', function(req, res) {
    res.sendFile(path.join(__dirname + "/regis.html"));
});

app.post('/sign_up', function(req, res) {
    data = { username: req.body.username, email: req.body.email, Password: req.body.passid };
    console.log("loginData", data)

    db1.collection('details').insertOne(data, function(err, result) {
        if (err) throw err;
        console.log("credentials saved!");
    });
    console.log(data);
    return res.redirect('loginpage.html');
});



app.get('/success.html', isAuth, function(req, res) {
    res.sendFile(path.join(__dirname + "/success.html"));
});

app.post('/logout', function(req, res) {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

app.get('/about_us_page.html', isAuth, function(req, res) {
    res.sendFile(path.join(__dirname + "/about_us_page.html"));
});

app.get('/diets_page.html', isAuth, function(req, res) {
    res.sendFile(path.join(__dirname + "/diets_page.html"));
});

app.get('/foods_page.html', isAuth, function(req, res) {
    res.sendFile(path.join(__dirname + "/foods_page.html"));
});

app.get('/tracking.html', isAuth, function(req, res) {
    res.sendFile(path.join(__dirname + "/tracking.html"));
});

app.get('/adminpage.html', isAuth, function(req, res) {
    res.sendFile(path.join(__dirname + "/adminpage.html"));
});

app.listen(8080, function() {
    console.log("listening to 8080");
});