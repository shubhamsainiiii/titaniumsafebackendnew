const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Review = require("../models/Review");
const sharp = require("sharp");

// ===============================
// Upload Image To Cloudinary
// ===============================
const uploadToCloudinary = (
    fileBuffer
) => {
    return new Promise(
        (resolve, reject) => {
            const stream =
                cloudinary.uploader.upload_stream(
                    {
                        folder: "titaniumsafe",
                        format: "webp",
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
            streamifier
                .createReadStream(fileBuffer)
                .pipe(stream);
        }
    );
};


// ===============================
// Create Product
// ===============================
exports.createProduct = async (req, res) => {

    try {

        const {
            name,
            brandName,
            colour,
            material,
            specialFeature,
            productDimensions,
            closureType,
            waterResistanceLevel,
            description,
            price,
            category,
        } = req.body;

        // Validation
        if (
            !name ||
            !brandName ||
            !colour ||
            !material ||
            !specialFeature ||
            !productDimensions ||
            !closureType ||
            !waterResistanceLevel ||
            !description ||
            !price ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required",
            });
        }
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const compressedBuffer =
                    await sharp(file.buffer)
                        .resize({
                            width: 1200,
                            withoutEnlargement: true,
                        })
                        .webp({
                            quality: 60,
                            effort: 6,
                        })
                        .toBuffer();

                const uploadedImage =
                    await uploadToCloudinary(
                        compressedBuffer
                    );

                imageUrls.push(
                    uploadedImage.secure_url
                );
            }
        }
        const product =
            await Product.create({
                name,
                brandName,
                colour,
                material,
                specialFeature,
                productDimensions,
                closureType,
                waterResistanceLevel,
                description,
                price,
                category,

                images: imageUrls,
            });

        res.status(201).json({
            success: true,
            message: "Product Created Successfully",
            product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.getProducts = async (req, res) => {

    try {

        const products =
            await Product.find()
                .sort({ createdAt: -1 });

        const productsWithRating =
            await Promise.all(

                products.map(async (product) => {

                    const reviews =
                        await Review.find({
                            productId: product._id,
                        });

                    const totalReviews =
                        reviews.length;

                    const averageRating =
                        totalReviews > 0
                            ? (
                                reviews.reduce(
                                    (sum, item) =>
                                        sum + item.rating,
                                    0
                                ) / totalReviews
                            ).toFixed(1)
                            : 0;

                    return {
                        ...product.toObject(),
                        averageRating,
                        totalReviews,
                    };
                })
            );

        res.status(200).json({
            success: true,
            products: productsWithRating,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Get Single Product
// ===============================
exports.getSingleProduct = async (req, res) => {

    try {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });

        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Update Product
// ===============================
exports.updateProduct = async (req, res) => {

    try {

        const {
            name,
            brandName,
            colour,
            material,
            specialFeature,
            productDimensions,
            closureType,
            waterResistanceLevel,
            description,
            price,
            category,
            available,
        } = req.body;

        // Find Product
        let product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });

        }

        // Upload New Images
        let imageUrls = product.images;

        if (req.files && req.files.length > 0) {

            imageUrls = [];

            for (let file of req.files) {

                const compressedBuffer =
                    await sharp(file.buffer)
                        .resize({
                            width: 1200,
                            withoutEnlargement: true,
                        })
                        .webp({
                            quality: 60,
                            effort: 6,
                        })
                        .toBuffer();

                const uploadedImage =
                    await uploadToCloudinary(
                        compressedBuffer
                    );

                imageUrls.push(
                    uploadedImage.secure_url
                );
            }
        }

        // Update Product
        product =
            await Product.findByIdAndUpdate(

                req.params.id,

                {
                    name,
                    brandName,
                    colour,
                    material,
                    specialFeature,
                    productDimensions,
                    closureType,
                    waterResistanceLevel,
                    description,
                    price,
                    category,
                    available,

                    images: imageUrls,
                },

                {
                    new: true,
                }
            );

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Delete Product
// ===============================
exports.deleteProduct = async (req, res) => {

    try {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });

        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Toggle Availability
// ===============================





exports.toggleAvailability = async (req, res) => {
    try {
        const product =
            await Product.findById(
                req.params.id
            );
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found",
            });
        }
        product.available =
            !product.available;
        await product.save();
        res.status(200).json({
            success: true,
            message:
                "Availability Updated",
            product,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};