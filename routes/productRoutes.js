const express = require("express");

const router = express.Router();

const upload = require("../middleware/multer");

const {
    isAdmin,
} = require("../middleware/authMiddleware");

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
} = require("../controllers/productController");


// ===============================
// Create Product
// ===============================
router.post(
    "/create",

    isAdmin,

    upload.array("images", 5),

    createProduct
);


// ===============================
// Get All Products
// ===============================
router.get(
    "/all",

    getProducts
);


// ===============================
// Get Single Product
// ===============================
router.get(
    "/single/:id",

    getSingleProduct
);


// ===============================
// Update Product
// ===============================
router.put(
    "/update/:id",

    isAdmin,

    upload.array("images", 5),

    updateProduct
);


// ===============================
// Delete Product
// ===============================
router.delete(
    "/delete/:id",

    isAdmin,

    deleteProduct
);


// ===============================
// Toggle Availability
// ===============================
router.put(
    "/toggle/:id",

    isAdmin,

    toggleAvailability
);

module.exports = router;