// const admin = require("../firebaseConfig");

// const verifyToken = async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(403).json({ message: "No token provided" });

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Unauthorized" });
//     }
// };

// module.exports = { verifyToken };