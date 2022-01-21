const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const { unauthorized } = require('../utils/dictionary');

const API_SECRET = 'ABC123456';

const JWT_CONFIG = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const user = decoded.data;

    return user;
  } catch (error) {
    console.log(`FALHA NA AUTENTICAÇÃO -> ${error.message}`);
    return res.status(unauthorized).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
