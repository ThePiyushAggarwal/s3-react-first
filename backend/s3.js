const aws = require('aws-sdk')
const User = require('./models/user.model')
const { v4 } = require('uuid')

const s3 = new aws.S3({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
})

async function generateUploadUrl(id) {
  const Key = v4()

  const params = {
    Bucket: 'myfirstawsbucketsoftseekers',
    Key,
    Expires: 60,
  }

  await User.findByIdAndUpdate(
    id,
    { $push: { imageUrls: [Key] } },
    { new: true, upsert: true }
  )

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

module.exports = { generateUploadUrl }
