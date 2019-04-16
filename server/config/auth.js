const jwt = require("jsonwebtoken");
const { secret } = require("../config/settings");

const getTokenForUser = userObject => {
  // creating a JWT and returning it.
  return jwt.sign(userObject, secret, { expiresIn: "1h" });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: "No authorization token found on Authorization header" });
  }
  jwt.verify(token, secret, (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: "Token invalid, please login", message: authError });
      return;
    }
    // sets the decoded JWT/user object on the request object for use in next middleware.
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  getTokenForUser,
  validateToken
};
