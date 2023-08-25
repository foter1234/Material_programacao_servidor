// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');


const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());//cookieParser()
app.use(
  expressJWT({
    secret: process.env.SECRET,//
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar","/usuarios/cadastrar"]})
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.get("/usuarios/cadastrar",async function (req,res){
 res.render('cadastro')
})

app.post("/usuarios/cadastrar", async function (req,res){
  if (req.body.senha == req.body.senha2 && req.body.novousuario != "") {

 await usuario.create(req.body)
 
    return res.json({
    novo_usuario_cadastrado:req.body.novousuario,
    senha:req.body.senha
    })//informações que serão passadas

  } else {
    res.status(500).json({mensagem:"cadastro Inválido"})//res.status()//erros do hhtp, exemplo:404//json({mensagem:"login inválido"})//mensagem em caso de erro
  }
 })
 
 



app.post('/logar', (req, res) => {

  if (req.body.usuario == res.query.usuario && req.body.senha == res.query.usuario) {
    //res.send("você está logado")
    const id = 1;
    const token = jwt.sign({id}, process.env.SECRET, {//gerar um token para cada login
     expiresIn: 300//tempo em que o token será expirado
    });
res.cookie("token", token, {httponly:true})// envia o cookie para a pagina, "token"=é o nome do token, token="variavel em quue gera o token" {httponly:true} serve para que só funcione no navegador
return res.json({
usuario:req.body.usuario,
token: token
})//informações que serão passadas

  } else {
    res.status(500).json({mensagem:"login inválido"})//res.status()//erros do hhtp, exemplo:404//json({mensagem:"login inválido"})//mensagem em caso de erro
  }


  
})

app.post('/deslogar', function(req, res) {
  res.cookie("token", null, {httponly:true})
  return res.json({deslogado:true})
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});


