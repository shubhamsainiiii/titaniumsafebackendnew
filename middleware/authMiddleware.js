const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");


// ===============================
// Protect Admin Routes
// ===============================
exports.isAdmin = async (req, res, next) => {

    try {

        let token;

        // Check Token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token =
                req.headers.authorization.split(" ")[1];

        }

        // No Token
        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
            });

        }

        // Verify Token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        // Find Admin
        const admin =
            await Admin.findById(decoded.id)
                .select("-password");

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Admin Not Found",
            });

        }

        // Save Admin In Request
        req.admin = admin;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid Token",
        });

    }
};