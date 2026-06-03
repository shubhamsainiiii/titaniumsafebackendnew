const express = require("express");

const router = express.Router();

const {
    isAdmin,
} = require("../middleware/authMiddleware");

const {
    createContact,
    getContacts,
    deleteContact,
} = require("../controllers/contactController");


// ===============================
// Create Inquiry
// Public Route
// ===============================
router.post(
    "/create",

    createContact
);


// ===============================
// Get All Inquiries
// Admin Only
// ===============================
router.get(
    "/all",

    isAdmin,

    getContacts
);


// ===============================
// Delete Inquiry
// Admin Only
// ===============================
router.delete(
    "/delete/:id",

    isAdmin,

    deleteContact
);

module.exports = router;