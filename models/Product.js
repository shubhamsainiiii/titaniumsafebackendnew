const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        brandName: {
            type: String,
            required: true,
            trim: true,
        },

        colour: {
            type: String,
            required: true,
            trim: true,
        },

        material: {
            type: String,
            required: true,
            trim: true,
        },

        specialFeature: {
            type: String,
            required: true,
            trim: true,
        },

        productDimensions: {
            type: String,
            required: true,
            trim: true,
        },

        closureType: {
            type: String,
            required: true,
            trim: true,
        },

        waterResistanceLevel: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        images: [
            {
                type: String,
                required: true,
            },
        ],

        category: {
            type: String,
            required: true,

            enum: [
                "Home Safes",
                "Office Vaults",
                "Jewelry Safes",
                "Digital Lockers",
                "Fireproof Safes",
            ],
        },

        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Product",
    productSchema
);