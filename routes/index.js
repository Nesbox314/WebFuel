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
app.listen(port, '0.0.0.0');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next){
  let createTodos = `create table if not exists usuarios(
    id int(11) primary key auto_increment,
    username varchar(100),
    password varchar(100),
    email varchar(100)
  )`;

  connection.query(createTodos, function(err, results, fields) {});
  
  res.render('login');
});

router.get('/cadastroUsuario', function(req, res, next){
  let createTodos = `create table if not exists usuarios(
    id int(11) primary key auto_increment,
    username varchar(100),
    password varchar(100),
    email varchar(100)
  )`;

  connection.query(createTodos, function(err, results, fields) {});

  res.render('cadastroUsuario');
});


router.get('/cadastroPostos', function(req, res, next){
  res.render('cadastroPostos');
});

router.get('/postos', function (req, res) {
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto longblob,
    avaliacao float,
    precoGasolinaComum float,
    precoGasolinaAditivada float,
    precoEtanol float,
    precoGnv float,
    precoDieselS10 float,
    precoDieselS500 float,
    cnpj varchar(100)
)`;

  connection.query(createTodos, function(err, results, fields) {});

  connection.query('SELECT * FROM postos', function (error, results, fields) {
      res.render('index', { 
        title: 'Render by app.get',
        datasetresult: results
      });
    });
});

router.post('/efetuaCadastroPostos', (req, res) =>{
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto longblob,
    avaliacao float,
    precoGasolinaComum float,
    precoGasolinaAditivada float,
    precoEtanol float,
    precoGnv float,
    precoDieselS10 float,
    precoDieselS500 float,
    cnpj varchar(100)
  )`;

  connection.query(createTodos, function(err, results, fields) {});

  const nome = req.body.nome.substring(0, 160);
  const cnpj = req.body.CNPJ.substring(0, 160);
  const foto = req.body.foto.substring(0, 160);
  console.log(nome);
  console.log(cnpj);
  console.log(foto);
  connection.query(`INSERT INTO postos(nome, cnpj, foto) VALUES('${nome}','${cnpj}', '${foto}')`, res);
});

const multer  = require('multer')
const upload = multer({});

router.post('/file_upload', upload.single('foto'), (req, res, next) => {
    // encoded has the base64 of your file
    const encoded = req.file.buffer.toString('base64');
    console.log(encoded);
});

module.exports = router;
