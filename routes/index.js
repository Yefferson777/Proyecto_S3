var express = require('express');
var router = express.Router();
require("dotenv").config()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inicio', { title: 'Express' });
});

router.get('/catalogo', function(req, res, next){
  res.render('catalogo');
});

router.get('/citas', function(req, res, next){
  res.render('citas');
});

router.get('/admin', function(req, res, next){
  res.render('admin');
});

router.get('/calendario', function(req, res, next){
  res.render('calendario');
});

router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/login', function(req, res, next){
  const user = req.body.usuario;
  const pass = req.body.clave;

  if (user == process.env.USERS && pass == process.env.PASS){
    res.redirect("/admin")
  }else{
    res.redirect("/login")
  }

});


  
console.log("el puerto es 3000")

module.exports = router;
