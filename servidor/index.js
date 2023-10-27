// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
var cookieParser = require('cookie-parser')
const express = require('express');
const { usuario } = require('./models');
const crypto = require('./crypto'); 


//console.log(encrypted_key);
//const decrypted_key = crypto.decrypt(encrypted_key);
//console.log(decrypted_key);

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
  }).unless({ path: ["/autenticar", "/logar", "/deslogar","/usuarios/cadastrar", "/usuarios/listar"]})
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



  if (req.body.senha == req.body.senha2) {
    await usuario.create({
      usuario: req.body.usuario,
      senha: crypto.encrypt(req.body.senha),
    
    });
 
    res.redirect("/usuarios/listar");
 
  } else {
    res.status(500).json({mensagem:"cadastro Inválido"})//res.status()//erros do hhtp, exemplo:404//json({mensagem:"login inválido"})//mensagem em caso de erro
  }
 })

 

 app.get("/usuarios/listar",async function (req,res){
  let usuarios =  await usuario.findAll();
  res.render("listar", {usuarios})
  })



app.post('/logar', async function (req, res)  {

//const usuarios = "lucas@gmail.com"
//const senha = "12344"

const usuarioss = await usuario.findOne({ where: {usuario: req.body.usuario, senha:crypto.encrypt(req.body.senha) }});

//const usuarios = await usuario.findOne({ where: {usuario: req.body.usuario } });
//const senha = await usuario.findOne({where: {senha:crypto.encrypt(req.body.senha)}})
//if(req.body.usuario == usuarios && req.body.senha == senha){}  /// PORQUE NÃO FUNCIONAAAAA?

if (usuarioss) {

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


