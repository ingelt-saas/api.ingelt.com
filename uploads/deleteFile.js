const fs = require('fs');

const deleteFile = (filePath) => new Promise((resolve, reject) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('File deleted successfully');
                }
            });
        } else {
            resolve('');
        }
    } catch (err) {
        reject(err);
    }
});

module.exports = deleteFile;