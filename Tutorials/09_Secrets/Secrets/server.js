require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');

// Inicializa la app
const app = express();

// Configuración de vistas y motores
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Conectar a la base de datos
connectDB();

// Configuración de Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Define las rutas de autenticación
app.use(authRoutes);

// Inicia el servidor
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
