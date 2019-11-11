var express = require('express');
var router = express.Router();
const app = express();         
const bodyParser = require('body-parser');
const port = 3005; //porta padrão
const mysql = require('mysql');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : '',
  database : 'webfuel'
});

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

router.get('/postos', function (req, res) {
  connection.query('SELECT * FROM postos', function (error, results, fields) {
      res.render('index', { 
        title: 'Render by app.get',
        datasetresult: results
      });
    });
});

router.post('/efetuaCadastroPostos', (req, res) =>{
  const nome = req.body.nome.substring(0, 160);
  const cnpj = req.body.CNPJ.substring(0, 160);
  const foto = req.body.foto.substring(0, 160);
  console.log(nome);
  console.log(cnpj);
  console.log(foto);
  connection.query(`INSERT INTO postos(nome, cnpj, foto) VALUES('${nome}','${cnpj}', '${foto}')`, res);
});

module.exports = router;
