const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const connectDB = require('./config/db');
const forceHttps = require('./src/middleware/forceHttps');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conecta ao banco de dados
connectDB();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(forceHttps);

// Rotas
app.use('/api', routes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});