const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY
});

module.exports = s3;