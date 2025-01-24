const { loginService, createDefaultUsersService } = require('../services/authService');
const { loginValidationRules, validate } = require('../validators/authValidator');

const login = [
  ...loginValidationRules, // Regras de validação
  validate, // Middleware de validação
  async (req, res) => {
    const { email, password } = req.body;
    const response = await loginService(email, password);
    res.status(response.status).json(response.data);
  },
];

const createDefaultUsers = async (req, res) => {
  const response = await createDefaultUsersService();
  res.status(response.status).json(response.data);
};

module.exports = { login, createDefaultUsers };
