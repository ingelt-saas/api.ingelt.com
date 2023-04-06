const fs = require('fs');

const deleteFile = (filePath) => {
    try {
        fs.unlink(`uploads/${filePath}`, (err) => {
            if (err) {
                throw err;
            } else {
                return 'File deleted successfully';
            }
        });
    } catch (err) {
        throw err;
    }
};

module.exports = deleteFile;