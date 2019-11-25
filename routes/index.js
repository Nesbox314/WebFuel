var express = require('express');
var router = express.Router();
const app = express();         
const bodyParser = require('body-parser');
const port = 3005; //porta padrão
const mysql = require('mysql');
const path = require('path');
const multer = require('multer');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: './public/logopostos/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('foto');

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

  connection.query(createTodos, function(err, results, fields) {}).end();

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

  connection.query(createTodos, function(err, results, fields) {}).end();

  connection.query('SELECT * FROM postos', function (error, results, fields) {
      res.render('index', { 
        title: 'Render by app.get',
        datasetresult: results
      });
    }).end();
});

router.post('/efetuaCadastroPostos', (req, res) =>{
  console.log(req);

  var nome = null;
  var cnpj = null;
  
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto varchar(1000),
    avaliacao float,
    precoGasolinaComum float,
    precoGasolinaAditivada float,
    precoEtanol float,
    precoGnv float,
    precoDieselS10 float,
    precoDieselS500 float,
    cnpj varchar(100)
  )`;

  connection.query(createTodos, function(err, results, fields) {}).end();
  

  upload(req, res, (err) => {
    if(err){
      res.render('cadastroPostos', {
        msg: err
      });
    } else {
      console.log(req.file);
      connection.query(`INSERT INTO postos(nome, cnpj, foto) VALUES('${nome}','${cnpj}', '${req.file.filename}')`, res).end();
      res.render('cadastroPostos');
    }
  });
});

module.exports = router;
