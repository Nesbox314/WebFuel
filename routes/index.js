var express = require('express');
var router = express.Router();
const app = express();         
const bodyParser = require('body-parser');
const port = 3005; //porta padrão
const mysql = require('mysql');
const path = require('path');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : '',
  database : 'webfuel'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next){
  res.render('login');
});

router.get('/cadastroUsuario', function(req, res, next){
  res.render('cadastroUsuario');
});

router.get('/cadastroPostos', function(req, res, next){
  res.render('cadastroPostos');
});

/*router.get('/postos', function(req, res, next){
  connection.query('SELECT * FROM postos', function(error, results, fields){
  console.log(results);
  res.render('index', {
    datasetresult: results
      nome: results.nome,
      foto: results.foto,
      avaliacao: results.avaliacao,
      precoGasolinaComum: results.precoGasolinaComum,
      precoGasolinaAditivada: results.precoGasolinaAditivada,
      precoEtanol: results.precoEtanol,
      precoGnv: results.precoGnv,
      precoDieselS10: results.precoDieselS10,
      precoDieselS500: results.precoDieselS500
    })
  });
});*/

module.exports = router;
