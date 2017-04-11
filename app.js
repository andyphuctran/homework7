var express = require('express'),
    app = express(),
    path = require('path'),
    crypto = require('crypto'),
    algorithm = 'aes256',
    key = 'asaadsaad',
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://127.0.0.1:27017/MWA";

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.status(200);
    MongoClient.connect(url)
        .then(function(db) {
            let collection = db.collection('homework7');
            collection.find().toArray(function(err, doc) {
                let decipher = crypto.createCipher(algorithm, key);
                let text = decipher.update(doc[0].message, 'hex', "utf8");
                text += decipher.final('utf8');
                res.render('index', { message: text });
                // console.log(doc[0].message);
            })
        })
        .catch(function(err) {
            console.log(err);
        });
}).listen(3000, '127.0.01');