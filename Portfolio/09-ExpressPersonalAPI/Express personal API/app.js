const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let names = []; // Almacena nombres de usuarios
let tasks = []; // Almacena tareas

app.use(bodyParser.json()); // Middleware para JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para parsing de formularios

// Endpoint GET para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint GET para /greet
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name); // Agrega el nombre a la lista
    }
    res.json(names); // Responde con la lista de nombres
});

// Endpoint POST para /task
app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task); // Agrega la tarea a la lista
    }
    res.json(tasks); // Devuelve la lista de tareas
});

// Endpoint DELETE para /task/:index
app.delete('/task/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1); // Elimina la tarea en el índice especificado
    }
    res.json(tasks); // Devuelve la lista actualizada de tareas
});

// Manejo de errores
app.use((err, req, res, next) => {
    res.status(404).send(err.message); // Muestra el mensaje de error
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
