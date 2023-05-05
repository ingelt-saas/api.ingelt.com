const s3 = require('./config/aws');
const deleteFile = (Key) => new Promise((resolve, reject) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: Key,
        };
        s3.deleteObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    } catch (err) {
        reject(err);
    }

});

module.exports = deleteFile;