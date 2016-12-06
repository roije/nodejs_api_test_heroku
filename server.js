var express = require('express');
var app = express();
var BodyParser = require('body-parser'); // middle
var usersQueries = require('./routes/users');
var productQueries = require('./routes/products');
var orderQueries = require('./routes/orders');

//Middleware pipeline Website ====|=>|
                            //<----
//Middleware
app.use(BodyParser.urlencoded({
    extended: true
}));

app.use(BodyParser.json());

app.use(usersQueries);
app.use(productQueries);
app.use(orderQueries);

app.use(function(req, res) {
    res.status(404);
    res.send({ 'msg': 'Page Not Found' });
});


app.listen(process.env.PORT ||3000);
