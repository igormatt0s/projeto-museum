const express = require('express');
const { login, createDefaultUsers } = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Limite de requisições
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limite de 10 requisições
  message: { message: 'Muitas tentativas de login. Tente novamente mais tarde.' },
});

// Rotas de autenticação
router.post('/create-default-users', createDefaultUsers);
router.post('/login', loginLimiter, login);

module.exports = router;