var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inicio', { title: 'Express' });
});

router.get('/views/catalogo.ejs', function(req, res, next){
  res.render('catalogo.ejs')
});

router.get('/views/citas.ejs', function(req, res, next){
  res.render('citas.ejs')
})

router.get('/views/login.ejs', function(req, res, next){
  res.render('login.ejs')
})
  
console.log("el puerto es 3000")

module.exports = router;
