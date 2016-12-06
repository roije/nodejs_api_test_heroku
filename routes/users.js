var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/store';
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var app = express();
var url = require('../config/config.js').mongodb;

//GET ALL USERS
app.get('/users', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.find({}).toArray(function(err, data) {

            res.json(data);
            db.close();
        });
    });
});

//GET SINGLE USER
app.get('/users/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.json(data);
            db.close();
        });
    });
});

//CREATE USER
app.post('/users', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');


        collection.insert(req.body, function(err, data) {

            res.json({"msg" : "user created"});
            db.close();
        });
    });
});

//DELETE USER
app.delete('/users/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        collection.deleteOne({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.json({"msg" : "user deleted!"});
            db.close();
        });
    });
});

//UPDATE USER
app.put('/users/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('users');

        //collection.updateOne({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {

        collection.updateOne({'_id' : ObjectId(req.params.id)}, {$set: req.body}, function(err, data) {

            res.json({"msg" : "user updated!"});
            db.close();
        });
    });
});

module.exports = app;
