const jwt = require('jsonwebtoken');
const UnauthorizedAccessError = require('../errors/unauthorizedAcessError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    req.user = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedAccessError('Необходима авторизация'));
  }

  next();
};
