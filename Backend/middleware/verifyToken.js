

const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[0] == 'Bearer' ? req.header('Authorization').split(' ')[1] : req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.rol = decoded.rol;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;