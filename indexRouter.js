
import bodyParser from "body-parser";
import { Router } from "express";

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('inicio', { title: 'Express' });
});

router.get('/catalogo', (req, res) => {
  res.render('catalogo.ejs');
});

router.get('/test', (req, res) => {
  res.render('test.ejs');
});

router.get('/services', (req, res) => {
  res.render('services.ejs');
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

router.get('/calendario', (req, res) => {
  res.render('calendario.ejs');
});

router.get('/adminserv', (req, res) => {
  res.render('adminser.ejs');
});

router.get('/adminstats', (req, res) => {
  res.render('adminstats.ejs');
});

router.post('/login', (req, res) => {
  const { usuario, clave } = req.body;
  console.log(usuario, clave);
  if (usuario === process.env.USERS && clave === process.env.PASS) {
    // Aquí deberías establecer alguna forma de sesión o token
    res.redirect('/admin');
  } else {
    // Puedes enviar un mensaje de error para mostrar en la página de login
    res.render('login', { error: 'Usuario o contraseña incorrectos' });
  }
});


export default router;
