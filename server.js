const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos de la carpeta build
app.use(express.static(path.join(__dirname, 'build')));

// Enviar el index.html para cualquier otra ruta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
