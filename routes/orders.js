/**
 * Created by roije on 06/12/2016.
 */
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = require('../config/config.js').mongodb;

//var url = 'mongodb://localhost:27017/store';

// Create Routes for Prodocts

app.get('/orders', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        var collection = db.collection('orders');

        collection.find({}).toArray(function (err, data) {

            res.json(data);
            db.close();
        });
    });
});

app.get('/orders/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        var collection = db.collection('orders');

        collection.findOne({ '_id': ObjectId(req.params.id) }, function (err, data) {

            res.send(data);
            db.close();
        });
    });
});

app.post('/orders', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if(err){
            res.status(500);
        }
        // connect to users, and products collection
        var ordersCollection = db.collection('orders');
        var productsCollection = db.collection('products');
        var usersCollection = db.collection('users');

        // declare an orders object
        var orderTotal = {};

        // search for a user with the objectid from req.body
        usersCollection.findOne({ '_id': ObjectId(req.body.user) }, function (err, data) {

            // add the user to the orders object
            orderTotal.user = data;

            // create the status and add it to the orders object
            orderTotal.status = {
                flow: {
                    description: "created",
                    status: 1
                },
                payment: {
                    description: "created",
                    status: 1
                }
            }
            // search for the product
            orderTotal.products = []

            req.body.products.forEach(function (element, index, array) {

                productsCollection.findOne({ '_id': ObjectId(element) }, function (err, result) {
                    orderTotal.products.push(result);

                    if (index === array.length -1) {
                        // write order object to collection order in mongodb
                        ordersCollection.insert(orderTotal, function (err, xxx) {
                            res.status(201);
                            res.location('/orders/' + xxx.insertedIds.toString());
                            res.json(xxx);
                            db.close();
                        });
                    }
                });
            })


        });

    });
});

// Update Route
app.put('/orders/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        var collection = db.collection('orders');

        collection.update({ '_id': ObjectId(req.params.id) }, { $set: req.body }, function (err, data) {

            res.send({ "msg": "order updated" });
            db.close();
        });
    });
});

// delete Route
app.delete('/orders/:id', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        var collection = db.collection('orders');

        collection.remove({ '_id': ObjectId(req.params.id) }, function (err, data) {

            res.send({ "msg": "order deleted" });
            db.close();
        });
    });
});

module.exports = app;