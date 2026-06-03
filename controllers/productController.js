const Product = require("../models/Product");

const cloudinary = require("../config/cloudinary");

const streamifier = require("streamifier");


// ===============================
// Upload Image To Cloudinary
// ===============================
const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const stream =
            cloudinary.uploader.upload_stream(

                {
                    folder: "titaniumsafe",
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

    });
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

        // Upload Images
        let imageUrls = [];

        if (req.files && req.files.length > 0) {

            for (let file of req.files) {

                const uploadedImage =
                    await uploadToCloudinary(file.buffer);

                imageUrls.push(
                    uploadedImage.secure_url
                );
            }
        }

        // Create Product
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


// ===============================
// Get All Products
// ===============================
exports.getProducts = async (req, res) => {

    try {

        const products =
            await Product.find()
                .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
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

                const uploadedImage =
                    await uploadToCloudinary(file.buffer);

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