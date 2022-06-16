const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const connectDB = require('./config/db')
const http = require('http')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { generateUploadUrl } = require('./s3')

// Making executable schema
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Apollo Server function. Boilderplate from documentation
async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  await connectDB()

  app.use(cors())
  app.use(express.json())

  app.post('/s3url', async (req, res) => {
    const { id, field } = req.body

    const url = await generateUploadUrl(id, field)
    res.send({ url })
  })

  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen(PORT, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
}

startApolloServer()
