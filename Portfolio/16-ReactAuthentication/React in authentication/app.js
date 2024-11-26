const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Crear un modelo para los usuarios
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// Estrategia de Passport para iniciar sesión
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'No user found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Invalid password' });

        return done(null, user);
    }
));

// Serialización y deserialización de usuarios
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Middleware de sesión
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware para procesar datos JSON y estáticos
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Modelo de la película
const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    genre: String,
    image: String,
    comments: [{ user: String, text: String }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
});

const Movie = mongoose.model('Movie', movieSchema);

// Rutas de autenticación
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Mostrar login
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/movies',  // Después de login, redirigir a la página principal de las películas
    failureRedirect: '/login',   // Si el login falla, quedarse en la página de login
}));

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Mostrar formulario de signup
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');  // Redirigir al login después de crear un nuevo usuario
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        res.redirect('/login'); // Redirigir al login después de hacer logout
    });
});

// Middleware para verificar autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Si está autenticado, proceder a la siguiente ruta
    } else {
        res.redirect('/login'); // Si no está autenticado, redirigir a login
    }
}

// Ruta raíz (Página inicial de la app)
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/movies');  // Si está autenticado, redirigir a la página de películas
    } else {
        res.redirect('/login');   // Si no está autenticado, redirigir a login
    }
});

// Rutas protegidas por autenticación
app.get('/movies', isAuthenticated, async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Página de las películas
});

app.post('/movies/:id/comments', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { user, text } = req.body;
    const movie = await Movie.findById(id);
    movie.comments.push({ user, text });
    await movie.save();
    res.status(200).send('Comment added');
});

app.put('/movies/:id/like', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    movie.likes += 1;
    await movie.save();
    res.status(200).send('Like added');
});

app.put('/movies/:id/dislike', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    movie.dislikes += 1;
    await movie.save();
    res.status(200).send('Dislike added');
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
