const express = require('express');

const app  = express();
const PORT = 3000;

app.use(express.json()); // permite receber JSON no body das requisições

app.get('/', (req, res) => {
  res.send('🎬 Movietrack funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});