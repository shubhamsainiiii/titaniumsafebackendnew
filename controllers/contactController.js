const Contact = require("../models/Contact");


// ===============================
// Create Contact / Inquiry
// ===============================
exports.createContact = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            message,
        } = req.body;

        // Validation
        if (
            !name ||
            !email ||
            !phone ||
            !message
        ) {

            return res.status(400).json({
                success: false,
                message: "All Fields Are Required",
            });

        }

        // Save Contact
        const contact =
            await Contact.create({

                name,
                email,
                phone,
                message,
            });

        res.status(201).json({
            success: true,
            message:
                "Inquiry Submitted Successfully",
            contact,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Get All Contacts
// ===============================
exports.getContacts = async (req, res) => {

    try {

        const contacts =
            await Contact.find()
                .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            contacts,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Delete Contact
// ===============================
exports.deleteContact = async (req, res) => {

    try {

        const contact =
            await Contact.findById(
                req.params.id
            );

        if (!contact) {

            return res.status(404).json({
                success: false,
                message: "Contact Not Found",
            });

        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message:
                "Contact Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};