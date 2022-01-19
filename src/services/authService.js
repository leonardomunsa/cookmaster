const jwt = require('jsonwebtoken');

const SECRET_PASSWORD = 'BIGMEGAJAMES';

const JWT_CONFIG = {
  expiresIn: '5h',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ data }, SECRET_PASSWORD, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_PASSWORD);
    const { username } = decoded.data;

    return username;
  } catch (error) {
    console.log('FALHA NA AUTENTICAÇÃO');
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
