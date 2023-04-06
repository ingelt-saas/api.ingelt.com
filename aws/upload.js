const s3 = require('./config/aws');

module.exports = (file, filePath, filename, callback) => {
    try {

        const params = {
            Bucket: 'ingelt-storage',
            Key: `${filePath}/${filename}`,
            Body: file,
            ACL: 'public-read-write'
        }
        return s3.upload(params, callback);
    } catch (err) {
        return err;
    }
}