const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

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

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
});

app.post('/movies/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { user, text } = req.body;
    const movie = await Movie.findById(id);
    movie.comments.push({ user, text });
    await movie.save();
    res.status(200).send('Comment added');
});

app.put('/movies/:id/like', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    movie.likes += 1;
    await movie.save();
    res.status(200).send('Like added');
});

app.put('/movies/:id/dislike', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    movie.dislikes += 1;
    await movie.save();
    res.status(200).send('Dislike added');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
