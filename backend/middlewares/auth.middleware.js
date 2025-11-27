const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autorización requerido' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato de autorización inválido' });
  }

  const token = parts[1];

  try {
    const secret = process.env.JWT_SECRET; 
    if (!secret) {
        console.error("FATAL ERROR: JWT_SECRET no está definido en las variables de entorno.");
        return res.status(500).json({ message: 'Error de configuración del servidor' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded.user; 
  
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;