var express = require('express');
var router = express.Router();
const app = express();         
const bodyParser = require('body-parser');
const port = 3005; //porta padrão
const mysql = require('mysql');
const path = require('path');
const multer = require('multer');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const document = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

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
router.get('/', function (req, res) {
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto varchar(150),
    avaliacao float,
    precoGasolinaComum float,
    precoGasolinaAditivada float,
    precoEtanol float,
    precoGnv float,
    precoDieselS10 float,
    precoDieselS500 float,
    cnpj varchar(100)
)`;

  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });

  connection.query('SELECT * FROM postos', function (error, results, fields) {
      res.render('index', { 
        title: 'Render by app.get',
        datasetresult: results
      });
    })
});

router.get('/logged', function (req, res) {
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto varchar(150),
    avaliacao float,
    precoGasolinaComum float,
    precoGasolinaAditivada float,
    precoEtanol float,
    precoGnv float,
    precoDieselS10 float,
    precoDieselS500 float,
    cnpj varchar(100)
)`;

  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });

  connection.query('SELECT * FROM postos', function (error, results, fields) {
    if(err){
      console.log(err);
    }
      res.render('indexLogged', { 
        title: 'Render by app.get',
        datasetresult: results
      });
    })
});

router.get('/login', function(req, res, next){
  let createTodos = `create table if not exists usuarios(
    id int(11) primary key auto_increment,
    username varchar(100),
    password varchar(100),
    email varchar(100)
  )`;
  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });

  res.render('login');
});

router.post('/efetuaLogin', function(req, res, next){
  let createTodos = `create table if not exists usuarios(
    id int(11) primary key auto_increment,
    username varchar(100),
    password varchar(100),
    email varchar(100)
  )`;
  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });

  var email = req.body.email.substring(0, 160);
  var password = req.body.password.substring(0, 160);

    if(email == 'admin' && password == 'admin'){
      res.redirect('/logged');
    } else {
      console.log("LOGIN INCORRETO");
    }
});


router.get('/cadastroUsuario', function(req, res, next){
  let createTodos = `create table if not exists usuarios(
    id int(11) primary key auto_increment,
    username varchar(100),
    password varchar(100),
    email varchar(100)
  )`;

  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });

  res.render('cadastroUsuario');
});


router.get('/cadastroPostos', function(req, res, next){
  res.render('cadastroPostos');
});

router.post('/efetuaCadastroPostos', (req, res) =>{ 
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

  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });
  
  var nome = req.body.nome.substring(0, 160);
  var cnpj = req.body.cnpj.substring(0, 160);
  
  connection.query(`INSERT INTO postos(nome, cnpj) VALUES('${nome}', '${cnpj}')`, function(err, results, fields) {
    if(err){
      console.log(err);
    }
    app.set('fotoId', results.insertId);
  });

  res.render('uploadImage');
});

router.post('/efetuaUploadImagem', (req, res) =>{  

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

  connection.query(createTodos, function(err, results, fields) {
    if(err){
      console.log(err).redirect;
    }
  });

  upload(req, res, (err) => {
    if(err){
      res.send({
        msg: err
      });
    } else {
      var idFoto = app.get('fotoId');
      connection.query(`UPDATE postos set foto = '${req.file.filename}' where id = '${idFoto}'`, function(err, results, fields){
        if(err){
          console.log(err);
        }
      });
      res.render('index');
    }
  });
});

router.get('/pedido', (req, res) =>{ 
  res.render('pedido');
});

router.post('/efetuaPedido', (req, res) =>{ 
  var tipoCombustivel = req.body.tipoCombustivel.substring(0, 160);
  var endereco = req.body.endereco.substring(0, 160);
  var litros = req.body.litros.substring(0, 160);

  connection.query(`INSERT INTO pedidos(tipo, local, litros) VALUES('${tipoCombustivel}', '${endereco}', '${litros}')`, function(err, results, fields) {
    if(err){
      console.log(err);
    } else {
      app.set('pedido', results.insertId);
    }
  });

});

router.get('/confirmaPedido', (req, res) =>{
  connection.query(`SELECT * from pedidos where id= '${app.get('pedido')}'`, function(err, results, fields) {
    if(err){
      console.log(err);
    }
    console.log(results);
  });
});

const storage = multer.diskStorage({
  destination: './public/logopostos/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('foto');

module.exports = router;
