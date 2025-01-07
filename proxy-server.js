import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/proxy', async (req, res) => {
    const { query, lat, lng, radius, language } = req.query;
    const apiKey = 'AIzaSyC_kWJGoGCdgwzLygI3REUY0uTJQXoZk9g'; // Reemplaza esto con tu clave de API

    try {
        const location = lat && lng ? `${lat},${lng}` : '19.4326,-99.1332'; // Ciudad de México por defecto
        const region = 'mx'; // Región específica para México
        
        // Solicitar la API de Google Places
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&radius=${radius}&region=${region}&language=${language || 'es'}&key=${apiKey}`);
        
        if (!response.ok) {
            return res.status(response.status).send('Error en la solicitud a la API de Google');
        }

        const data = await response.json();

        if (!data || !data.results) {
            return res.status(500).send('Datos inesperados de la API de Google');
        }

        res.json(data); // Responder con los datos obtenidos de la API
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        res.status(500).send('Error al hacer la solicitud a la API de Google');
    }
});

app.listen(port, () => {
    console.log(`Servidor de proxy funcionando en el puerto ${port}`);
});
