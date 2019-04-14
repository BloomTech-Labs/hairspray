const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

const userToken = user => {
  return jwt.sign(user, SECRET, { expiresIn: '1h' });
};

const stylistToken = stylist => {
  return jwt.sign(stylist, SECRET, { expiresIn: '1h' });
};

const getToken = () => jwt.sign(0, SECRET);

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'No token found on Authorization header.' });
  }
  jwt.verify(token, SECRET, (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid', message: authError });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  userToken,
  stylistToken,
  validateToken,
  getToken
};
