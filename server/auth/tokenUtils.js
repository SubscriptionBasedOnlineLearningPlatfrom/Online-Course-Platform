import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  const payload = {
    id: user.id,
    email: user.email,
    full_name: user.full_name || user.name || user.fullName,
    role: user.role || 'instructor',
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

// Add this new function
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // Unauthorized if no token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user;
    next();
  });
};