// Restricts a route to one or more roles. Must run AFTER the auth middleware
// so that req.user is populated.
const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
};

export default roleCheck;