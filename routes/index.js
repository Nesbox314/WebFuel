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

const connection = mysql.createConnection({
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : '',
  database : 'webfuel'
});

//inicia o servidor
app.listen(port, '0.0.0.0');

router.get('/', function (req, res) {
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto Blob,
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

  res.redirect('/');
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

router.post('/efetuaCadastroUsuario', function(req, res, next){
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

  var username = req.body.nome;
  var password = req.body.password;
  var email = req.body.email;

  connection.query(`INSERT INTO usuarios (username, password, email) VALUES ('${username}', '${password}', '${email}');`, function(err, results, fields) {
    if(err){
      console.log(err);
    }else{
      console.log("Query executada com sucesso!");
    }
  });

  res.redirect('/');
});


router.get('/cadastroPostos', function(req, res, next){
  res.render('cadastroPostos');
});

router.post('/efetuaCadastroPostos', (req, res) =>{ 
  let createTodos = `create table if not exists postos(
    id int(100) primary key auto_increment,
    nome varchar(150)not null,
    foto Blob,
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
    foto Blob,
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

  var base64photo = req.body.base64photo;
  var idFoto = app.get('fotoId');

  console.log(idFoto);

  connection.query(`UPDATE postos SET foto = '${base64photo}' WHERE id = '${idFoto}'`, function(err, results, fields) {
    if(err){
      console.log(err);
    }
  });
  
    res.redirect('/');
});

router.get('/pedido', (req, res) =>{ 
  res.render('pedido');
});

router.post('/efetuaPedido', (req, res) =>{ 
  var endereco = req.body.endereco.substring(0, 160);
  var litros = req.body.litros.substring(0, 160);
  var formaPagamento = req.body.formaPagamento.substring(0, 160);

  connection.query(`INSERT INTO pedidos(local, litros, forma) VALUES('${endereco}', '${litros}', '${formaPagamento}')`, function(err, results, fields) {
    if(err){
      console.log(err);
    } else {
      app.set('pedido', results.insertId);
      res.redirect('/confirmaPedido');
    }
  });
});

router.get('/confirmaPedido', (req, res) =>{
  connection.query(`SELECT * from pedidos where id= '${app.get('pedido')}'`, function(err, results, fields) {
    if(err){
      console.log(err);
    }
      res.render('confirmaPedido', { 
        title: 'Render by app.get',
        datasetresult: results
      });
    })
  });

module.exports = router;
