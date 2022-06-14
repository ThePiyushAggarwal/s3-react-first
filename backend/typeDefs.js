const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID
    fName: String
    image: String
    imageUrls: [String]
  }

  type Query {
    getAllUser: [User]
  }

  type Mutation {
    createUser(fName: String): User
  }
`

module.exports = typeDefs
