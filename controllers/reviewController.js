const Review = require("../models/Review");

const Product = require("../models/Product");


// ===============================
// Create Review
// ===============================
exports.createReview = async (req, res) => {

    try {

        const {
            productId,
            userName,
            review,
            rating,
        } = req.body;

        // Validation
        if (
            !productId ||
            !userName ||
            !review ||
            !rating
        ) {

            return res.status(400).json({
                success: false,
                message: "All Fields Are Required",
            });

        }

        // Check Product
        const product =
            await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });

        }

        // Create Review
        const newReview =
            await Review.create({

                productId,
                userName,
                review,
                rating,
            });
        res.status(201).json({
            success: true,
            message:
                "Review Added Successfully",
            review: newReview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getProductReviews = async (req, res) => {
    try {
        const reviews =
            await Review.find({
                productId: req.params.productId,
            }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ===============================
// Get Latest Reviews
// ===============================
exports.getLatestReviews = async (req, res) => {

    try {

        const reviews =
            await Review.find()
                .sort({ createdAt: -1 })
                .limit(5);

        res.status(200).json({
            success: true,
            reviews,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Delete Review
// ===============================
exports.deleteReview = async (req, res) => {

    try {

        const review =
            await Review.findById(
                req.params.id
            );

        if (!review) {

            return res.status(404).json({
                success: false,
                message: "Review Not Found",
            });

        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            message:
                "Review Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};