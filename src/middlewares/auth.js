const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Jika tidak ada token, kirimkan status 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing!" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan informasi user ke dalam request object
    req.user = decoded;

    // Lanjut ke middleware berikutnya atau route handler
    next();
  } catch (error) {
    // Jika token tidak valid atau expired, kirimkan status 403 (Forbidden)
    res.status(403).json({ message: "Invalid or expired token!" });
  }
};

module.exports = authenticateToken;
