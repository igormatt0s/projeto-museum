const { check, validationResult } = require('express-validator');

// Validação para inserção de obras de arte
const insertArtworkValidationRules = [
  check('image').notEmpty().withMessage('O campo "image" é obrigatório.'),
  check('title').notEmpty().withMessage('O campo "title" é obrigatório.'),
  check('year').isNumeric().withMessage('O campo "year" deve ser numérico.'),
  check('artist').notEmpty().withMessage('O campo "artist" é obrigatório.'),
  check('artistNationality').notEmpty().withMessage('O campo "artistNationality" é obrigatório.'),
  check('city').notEmpty().withMessage('O campo "city" é obrigatório.'),
  check('country').notEmpty().withMessage('O campo "country" é obrigatório.'),
  check('objectName').notEmpty().withMessage('O campo "objectName" é obrigatório.'),
  check('department').notEmpty().withMessage('O campo "department" é obrigatório.'),
];

// Middleware para verificar os resultados da validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { insertArtworkValidationRules, validate };
