const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para la página de inicio
router.get('/', (req, res) => {
  res.render('index'); // Renderiza 'index.ejs' en la carpeta 'views'
});

// Ruta para la página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Ruta POST para procesar el login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/secrets',
  failureRedirect: '/login',
  failureFlash: true // Muestra el mensaje de error en caso de fallo
}));

// Ruta para la página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Ruta POST para procesar el registro
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Cifra la contraseña

    // Crea un nuevo usuario
    const newUser = new User({
      email: email,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/login'); // Redirige al login
  } catch (err) {
    console.error(err);
    res.redirect('/register'); // Si hay un error, redirige al registro
  }
});

// Ruta para la página de secretos
router.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets'); // Si está autenticado, muestra la página de secretos
  } else {
    res.redirect('/login'); // Si no está autenticado, redirige al login
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/secrets');
    }
    res.redirect('/');
  });
});

module.exports = router;
