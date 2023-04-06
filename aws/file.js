const s3 = require('./config/aws');

module.exports = async (Key) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: Key,
        Expires: 900
    };
    try {
        const url = await new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', params, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });
        return url;
    } catch (err) {
        throw err;
    }
}