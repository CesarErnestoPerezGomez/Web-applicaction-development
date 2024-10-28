const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para manejar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Variable para almacenar el nombre del usuario
let loggedUser = '';

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para manejar el login
app.post('/login', (req, res) => {
    loggedUser = req.body.userName; // Guarda el nombre del usuario
    res.redirect('/home'); // Redirige a la página de inicio después de iniciar sesión
});

app.get('/home', (req, res) => {
    if (!loggedUser) {
        return res.redirect('/'); // Redirige si no hay usuario logueado
    }
    res.render('home', { userName: loggedUser }); // Renderiza la plantilla EJS con el nombre del usuario
});

// Ruta para la plantilla de publicaciones
app.get('/post', (req, res) => {
    if (!loggedUser) {
        return res.redirect('/'); // Redirige si no hay usuario logueado
    }
    res.render('post', { userName: loggedUser });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
