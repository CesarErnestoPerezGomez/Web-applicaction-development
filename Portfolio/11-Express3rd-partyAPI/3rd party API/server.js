const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static(__dirname)); // Serve static files from the current directory

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ error: 'City is required.' });
    }
    
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = response.data;

        const result = {
            name: data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.json({ error: 'Unable to retrieve weather data. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
