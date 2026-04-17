import jwt from "jsonwebtoken";

// User auth
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Admin auth
export const requireAdmin = (req, res, next) => {
  const token = req.cookies?.adminToken;
  if (!token)
    return res.status(401).json({ message: "Admin not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired admin token" });
  }
};
