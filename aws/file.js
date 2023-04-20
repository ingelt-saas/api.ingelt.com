const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const createPresignedUrlWithClient = async ({ region, bucket, key }) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
    region,
  });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

module.exports = async (Key) => {
  const REGION = "ap-south-1";
  const BUCKET = process.env.AWS_S3_BUCKET;
  const KEY = Key;

  try {
    const clientUrl = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });
    return clientUrl;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
