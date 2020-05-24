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
var dateObject = new Date();

router.post('/inserimentoVoto', function (req, res, next) {
    let valutazione = req.body;
    if (!valutazione) {
        next(createError(400 , "Fornire una valutazione corretta"));
    }
    sql.connect(config, err => {
    let sqlRequest = new sql.Request();
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();
    let full_date = year + "-" + month + "-" + date;
    let sqlInsert = `INSERT INTO Registro(Voto, Tipo, Data, IDStudente) VALUES('${valutazione.voto}', '${valutazione.tipo}','${full_date}', (SELECT ID FROM Studente WHERE Nome ='${valutazione.nome}' AND Cognome='${valutazione.cognome}'))`;
    sqlRequest.query(sqlInsert, (error, results) => {
        if (error) throw error;
        return res.send({ success: true, message: 'Valutazione inserita con successo', data: results });
    });
    })
});

module.exports = router;