const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const path = require('path')
const { exportFolder } = require('../lib/folder-utils')
const schema = require('./schema')
const formatError = require('./formatError')

const repositories = exportFolder(process.cwd(), '-repository', { basepath: 'src/repositories' })
const services = exportFolder(process.cwd(), '-service', { basepath: 'src/services' })
const utils = exportFolder(process.cwd(), '-util', { 
  basepath: 'src/utils',
  inject: {
    repositories,
    services
  }
})

const { CODES } = require(path.join(process.cwd(), 'src/errors'))

module.exports = new ApolloServer({
  schema: makeExecutableSchema(schema),
  formatError: formatError(CODES),
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