import jwt from 'jsonwebtoken';

// Single auth middleware for all roles — uses the standard
// "Authorization: Bearer <token>" header instead of a custom header.
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user to req.user (NOT req.body) so downstream
    // middleware and controllers can trust the authenticated identity.
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' });
  }
};

export default auth;