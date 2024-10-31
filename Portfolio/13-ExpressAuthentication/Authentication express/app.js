// Importar dependencias
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieParser = require("cookie-parser");
const User = require("./User"); // Importa el modelo User que definimos

// Configuración de la aplicación
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());

// Configuración de la sesión
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Configurar Passport-Local Mongoose para manejo de sesiones y contraseñas
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// Configuración de estrategia de autenticación Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
},
function (accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                googleId: profile.id,
                username: profile.displayName
            });
            newUser.save((err) => {
                if (err) return done(err);
                return done(null, newUser);
            });
        }
    });
}));

// Middleware para autenticación
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

// Rutas
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/secrets", ensureAuthenticated, (req, res) => {
    User.find({ secret: { $ne: null } }, (err, foundUsers) => {
        if (err) console.log(err);
        else res.render("secrets", { usersWithSecrets: foundUsers });
    });
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
});

// Ruta para autenticar con Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/secrets", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/secrets");
    }
);

// Registro de usuario
app.post("/register", (req, res) => {
    User.register({ username: req.body.username, email: req.body.email }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secrets");
            });
        }
    });
});

// Inicio de sesión de usuario
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login"
}));

// Enviar un secreto
app.post("/submit", ensureAuthenticated, (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) console.log(err);
        else {
            user.secret = req.body.secret;
            user.save(() => res.redirect("/secrets"));
        }
    });
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
