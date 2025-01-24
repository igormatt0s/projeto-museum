const { check, validationResult } = require('express-validator');

// Validação para a rota de login
const loginValidationRules = [
  check('email').isEmail().withMessage('Email inválido.'),
  check('password').notEmpty().withMessage('A senha é obrigatória.'),
];

// Middleware para verificar os resultados da validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { loginValidationRules, validate };
