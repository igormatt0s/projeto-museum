const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../../config/logger');

// Serviço para realizar login
const loginService = async (email, password) => {
  try {
    // Validação de entrada
    if (!email || !password) {
        return { status: 400, data: { message: 'Email e senha são obrigatórios.' } };
    }

    // Verifica se o email existe no banco
    const user = await User.findOne({ email });
    if (!user) {
      logger.info(`Login falhou para email: ${email}`);
      return { status: 404, data: { message: 'Usuário não encontrado.' } };
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.info(`Senha inválida para email: ${email}`);
      return { status: 401, data: { message: 'Senha inválida.' } };
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    return { 
      status: 200, 
      data: { 
        user: { id: user._id, name: user.name, email: user.email },
        token 
      } 
    };
  } catch (error) {
    logger.error('Erro ao fazer login:', error);
    console.error('Erro ao fazer login:', error);
    return { status: 500, data: { message: 'Erro no servidor.' } };
  }
};

// Serviço para criar usuários padrão
const createDefaultUsersService = async () => {
  try {
    // Define usuários padrão
    const defaultUsers = [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Teste',
        email: 'teste@teste.com',
        password: await bcrypt.hash('teste123', 10),
      },
    ];

    for (const user of defaultUsers) {
      const exists = await User.findOne({ email: user.email });
      if (!exists) {
        await User.create(user);
      }
    }

    return { status: 201, data: { message: 'Usuários padrão criados com sucesso!' } };
  } catch (error) {
    logger.error('Erro ao criar usuários padrão:', error);
    console.error('Erro ao criar usuários padrão:', error);
    return { status: 500, data: { message: 'Erro no servidor.' } };
  }
};

module.exports = { loginService, createDefaultUsersService };
