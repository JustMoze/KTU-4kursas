const config = require("config");
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (!config.get('requiresAuth')) return next();

  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({message: 'Access denied. No token provided'});

  try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      if(!decoded.isAdmin) return res.status(403).json({message: 'You do not have permission'})
      next();
  } catch (ex) {
      res.status(401).json({message: 'Invalid token'});
  }
};

