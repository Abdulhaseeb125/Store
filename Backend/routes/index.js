var express = require('express');

var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req, res) {
    res.status(404).send()
});


module.exports = indexRouter;
