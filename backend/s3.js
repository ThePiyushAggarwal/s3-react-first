const aws = require('aws-sdk')

const s3 = new aws.S3({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
})

async function generateUploadUrl(imageName) {
  const params = {
    Bucket: 'myfirstawsbucketsoftseekers',
    Key: imageName,
    Expires: 60,
  }

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

module.exports = { generateUploadUrl }
