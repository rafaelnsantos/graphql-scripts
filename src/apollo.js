const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'js' : 'ts'

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const path = require('path')
const { exportFolder } = require('folder-utils')
const schema = require('./schema')(isProduction ? 'js' : 'ts')
const formatError = require('./formatError')

const basePath = path.join(process.cwd(), isProduction ? 'build' : 'src')

const repositories = exportFolder(path.join(basePath, 'repositories'), '-repository', { mode })
const services = exportFolder(path.join(basePath, 'services'), '-service', { mode })
const utils = exportFolder(path.join(basePath, 'utils'), '-util', { 
  inject: {
    repositories,
    services
  },
  mode
})

const { CODES } = require(path.join(basePath, 'errors'))

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