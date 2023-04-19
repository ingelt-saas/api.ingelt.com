const s3 = require('./config/aws');
module.exports = (Key, callback) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: Key,
        };
        s3.deleteObject(params, callback);
    } catch (err) {
        throw err;
    }
}