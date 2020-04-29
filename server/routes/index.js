var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const config = {
  user: 'gottardo.joshua',
  password: 'xxx123#',
  server: "213.140.22.237"
};
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/inserimentoVoto', function (req, res, next) {
  let valutazione = req.body;
  if (!valutazione) {
    next(createError(400 , "Fornire una valutazione corretta"));
  }
  sql.connect(config, err => {
    let sqlRequest = new sql.Request();
    let sqlInsert = //query di inserimento
    sqlRequest.query(sqlInsert, (error, results) => {
        if (error) throw error;
        return res.send({ success: true, message: 'Valutazione inserita con successo', data: results });
    });
  })
});

module.exports = router;
