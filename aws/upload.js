const s3 = require('./config/aws');

module.exports = (file, filePath, callback) => {
    try {
        const filename = `${Date.now()}-${new Date().getSeconds()}`;
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${filePath}/${filename}`,
            Body: file.buffer,
            ContentType: file.mimetype
        }
        return s3.upload(params, callback);
    } catch (err) {
        throw err;
    }
}