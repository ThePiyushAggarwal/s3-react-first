const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    id: ID
    fName: String
    imageUrls: [String]
    imageUrls2: [String]
  }

  type Query {
    getAllUser: [User]
  }

  type Mutation {
    createUser(fName: String): User
  }
`

module.exports = typeDefs
