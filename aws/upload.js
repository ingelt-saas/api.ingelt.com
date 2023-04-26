const s3 = require("./config/aws");

module.exports = async (file, filePath, callback) => {
    try {
        let params;
        const Bucket = process.env.AWS_S3_BUCKET;

        if (Array.isArray(file)) {
            params = [];
            let index = 0;
            for (let f of file) {
                const filename = `${Date.now()}-${index}`;
                params.push({
                    Bucket: Bucket,
                    Key: `${filePath}/${filename}`,
                    Body: f.buffer,
                    ContentType: f.mimetype
                });
                index++;
            }
        } else {
            const filename = `${Date.now()}-${new Date().getSeconds()}`;
            params = {
                Bucket: Bucket,
                Key: `${filePath}/${filename}`,
                Body: file.buffer,
                ContentType: file.mimetype
            }
        }

        if (Array.isArray(params)) {
            try {
                const res = await Promise.all(
                    params.map(param => s3.upload(param).promise())
                );
                callback(null, res);
            } catch (err) {
                callback(err);
            }
        } else {
            s3.upload(params, callback);
        }
    } catch (err) {
        throw err;
    }
}