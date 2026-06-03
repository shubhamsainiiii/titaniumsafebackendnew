const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// =============================
// Register Admin
// =============================
exports.registerAdmin = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;

        // Check Existing Admin
        const existingAdmin = await Admin.findOne({
            email,
        });

        if (existingAdmin) {

            return res.status(400).json({
                success: false,
                message: "Admin Already Exists",
            });

        }

        // Hash Password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create Admin
        const admin = await Admin.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Admin Registered Successfully",
            admin,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// =============================
// Login Admin
// =============================
exports.loginAdmin = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;

        // Check Admin
        const admin = await Admin.findOne({
            email,
        });

        if (!admin) {

            return res.status(400).json({
                success: false,
                message: "Invalid Email Or Password",
            });

        }

        // Compare Password
        const isMatch =
            await bcrypt.compare(
                password,
                admin.password
            );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid Email Or Password",
            });

        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: admin._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",

            token,

            admin: {
                _id: admin._id,
                email: admin.email,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};