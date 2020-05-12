var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var formidable = require('formidable');
var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="speech" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
});

module.exports = router;
