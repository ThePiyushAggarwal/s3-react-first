const User = require('./models/user.model')

const resolvers = {
  Query: {
    getAllUser: async () => {
      return await User.find()
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const newUser = {
        fName: args.fName,
      }

      return await User.create(newUser)
    },
  },
}

module.exports = resolvers
