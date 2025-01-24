const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado
const authenticateToken = (req, res, next) => {
  const token = req.header('authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido.' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
