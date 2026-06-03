const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();


// ======================================
// Middleware
// ======================================
app.use(
    cors({
        origin: [

            "https://titaniumsafe.vercel.app",

            "https://titaniumsafeadmin.vercel.app",

            "http://localhost:5173",

            "http://localhost:5174",

        ],

        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));


// ======================================
// Routes
// ======================================
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/products",
    require("./routes/productRoutes")
);

app.use(
    "/api/reviews",
    require("./routes/reviewRoutes")
);

app.use(
    "/api/contact",
    require("./routes/contactRoutes")
);


// ======================================
// Default Route
// ======================================
app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "TitaniumSafe API Running Successfully",
    });

});


// ======================================
// MongoDB Connection
// ======================================
mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("✅ MongoDB Connected");

    })

    .catch((error) => {

        console.log("❌ MongoDB Error:", error);

    });


// ======================================
// Server
// ======================================
const PORT =
    process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(
        `🚀 Server Running On Port ${PORT}`
    );

});