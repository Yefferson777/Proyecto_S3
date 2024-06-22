
import bodyParser from "body-parser";
import { Router } from "express";

const router = Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.render('inicio', { title: 'Express' });
});

router.get('/catalogo', (req, res) => {
  res.render('catalogo.ejs');
});

router.get('/citas', (req, res) => {
  res.render('citas');
});

router.get('/admin', (req, res) => {
  res.render('admin');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const user = req.body.usuario;
  const pass = req.body.clave;

  if (user == process.env.USER && pass == process.env.PASS){
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});

export default router;
