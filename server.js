const express = require("express");
const cors = require("cors");
require("dotenv").config();


console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO URI EXISTS:", !!process.env.MONGO_URI);

const connectDB = require("./config/connectDB"); // path apne hisab se

const app = express();

// Connect DB
connectDB();


// Middleware
app.use(cors({
    origin: [
        "https://titaniumsafe.vercel.app",
        "https://titaniumsafeadmin.vercel.app",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Default Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TitaniumSafe API Running Successfully",
    });
});

// Localhost only
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log(`🚀 Server Running On Port ${PORT}`);
    });
}

module.exports = app;