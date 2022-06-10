const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')

const { generateUploadUrl } = require('./s3')

app.use(cors())
app.use(express.json())

app.post('/s3url', async (req, res) => {
  const url = await generateUploadUrl(req.body.name)
  res.send({ url })
})

app.listen(5000, () => console.log('Server running on PORT 5000'))
