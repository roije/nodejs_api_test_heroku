var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/store';
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var url = require('../config/config.js').mongodb;


//Routes for products
app.get('/products', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.find({}).toArray(function(err, data) {

            res.json(data);
            db.close();
        });
    });
});

app.get('/products/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.json(data);
            db.close();
        });
    });
});

app.post('/products', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');


        collection.insert(req.body, function(err, data) {

            res.json({"msg" : "product created"});
            db.close();
        });
    });
});

app.delete('/products/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');


        collection.deleteOne({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.json({"msg" : "product deleted!"});
            db.close();
        });
    });
});

app.put('/products/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('products');


        //collection.updateOne({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {


        collection.updateOne({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {

            res.json({"msg" : "product updated!"});
            db.close();
        });
    });
});

module.exports = app;
