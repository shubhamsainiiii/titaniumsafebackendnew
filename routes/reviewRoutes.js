const express = require("express");

const router = express.Router();

const {
    isAdmin,
} = require("../middleware/authMiddleware");

const {
    createReview,
    getProductReviews,
    getLatestReviews,
    deleteReview,
    getAllReviews
} = require("../controllers/reviewController");


// ===============================
// Create Review
// Public Route
// ===============================
router.post(
    "/create",

    createReview
);


// ===============================
// Get Reviews Of Single Product
// Public Route
// ===============================
router.get(
    "/product/:productId",

    getProductReviews
);


// ===============================
// Get Latest Reviews
// Public Route
// ===============================
router.get(
    "/latest",

    getLatestReviews
);

router.get(
    "/all",
    isAdmin,
    getAllReviews
);


// ===============================
// Delete Review
// Admin Only
// ===============================
router.delete(
    "/delete/:id",

    isAdmin,

    deleteReview
);

module.exports = router;