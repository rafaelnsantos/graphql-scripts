const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const path = require('path')
const { exportFolder } = require('folder-utils')
const schema = require('./schema')
const formatError = require('./formatError')

const repositories = exportFolder(process.cwd(), '-repository', { basepath: process.env.NODE_ENV === 'production' ? 'build/repositories' : 'src/repositories' })
const services = exportFolder(process.cwd(), '-service', { basepath: process.env.NODE_ENV === 'production' ? 'build/services' : 'src/services' })
const utils = exportFolder(process.cwd(), '-util', { 
  basepath: process.env.NODE_ENV === 'production' ? 'build/utils' : 'src/utils',
  inject: {
    repositories,
    services
  }
})

const { CODES } = require(path.join(process.cwd(), process.env.NODE_ENV === 'production' ? 'build/errors' : 'src/errors'))

module.exports = new ApolloServer({
  schema: makeExecutableSchema(schema),
  formatError: formatError(CODES),
  context: async ({ req, connection }) => connection
    ? ({
      token: connection.context.token,
      services,
      repositories,
      utils
    }) : ({
      token: req.headers.token,
      services,
      repositories,
      utils
    })
})