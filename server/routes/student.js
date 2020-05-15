var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
  user: 'gottardo.joshua',
  password: 'xxx123#',
  server: "213.140.22.237"
};

var express = require('express');
var router = express.Router();

router.get('/all/', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select * from Registro R JOIN Studente S ON R.IDStudente = S.ID', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
  });
});

router.get('/all/:nome/:cognome', function(req, res, next) {
    var nome = req.params.nome
    var cognome = req.params.cognome
    sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select * from dbo.Registro where IDStudente = (select ID from Studente where nome=?nome and cognome=?cognome)', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.send(result);  //Invio il risultato
    });
  });
});

router.get('/poeti/person', function(req,res,next){
    const person = people.find((m) => m.name === req.query.name);;
    
  
});

module.exports = router;