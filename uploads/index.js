const multer = require('multer');

const diskStorage = (uploadedPath) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${uploadedPath}`);
        },

        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `${Date.now()}.${ext}`);
        },

        fileFilter: (req, file, cb) => {
            if (file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype === "image/png" || file.mimetype === "image/webp" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
    });
}

const fileUploadService = (path) => multer({ storage: diskStorage(path) });

module.exports = fileUploadService;