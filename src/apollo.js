const isProduction = process.env.NODE_ENV === 'production'

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const path = require('path')
const { exportFolder } = require('folder-utils')
const schema = require('./schema')(isProduction ? 'js' : 'ts')
const formatError = require('./formatError')

const repositories = exportFolder(process.cwd(), '-repository', { basepath: isProduction ? 'build/repositories' : 'src/repositories' })
const services = exportFolder(process.cwd(), '-service', { basepath: isProduction ? 'build/services' : 'src/services' })
const utils = exportFolder(process.cwd(), '-util', { 
  basepath: isProduction ? 'build/utils' : 'src/utils',
  inject: {
    repositories,
    services
  }
})

const { CODES } = require(path.join(process.cwd(), isProduction ? 'build/errors' : 'src/errors'))

exports.repositories = repositories
exports.services = services
exports.utils = utils

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