const multer = require("multer");


// Store In Memory
const storage = multer.memoryStorage();


// File Filter
const fileFilter = (req, file, cb) => {

    if (
        file.mimetype.startsWith("image/")
    ) {

        cb(null, true);

    } else {

        cb(
            new Error("Only Images Allowed"),
            false
        );

    }
};


// Upload Config
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

});

module.exports = upload;