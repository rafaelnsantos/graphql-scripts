const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const { exportFolder } = require('../lib/folder-utils')
const schema = require('./schema')

const repositories = exportFolder(process.cwd(), '-repository', { basepath: 'src/repositories' })
const services = exportFolder(process.cwd(), '-service', { basepath: 'src/services' })
const utils = exportFolder(process.cwd(), '-util', { basepath: 'src/utils' }, {
  inject: {
    repositories,
    services
  }
})

console.log({ repositories, services, utils })

module.exports = new ApolloServer({
  schema: makeExecutableSchema(schema),
  // formatError,
  context: async ({ req, connection }) => connection
    ? ({
      // user: await controllers.auth.verifyTokenSubscription(connection.context.token),
      services,
      repositories,
      utils
      // loaders: createDataloaders(repositories)
    }) : ({
      token: req.headers.token,
      services,
      repositories,
      utils
      // loaders: createDataloaders(repositories)
    })
})