const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'js' : 'ts'

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const path = require('path')
const { exportFolder } = require('folder-utils')
const schema = require('./schema')(isProduction ? 'js' : 'ts')
const formatError = require('./formatError')

const basePath = path.join(process.cwd(), isProduction ? 'build' : 'src')

const repositories = require('./repositories')
const services = require('./services')
const utils = require('./utils')({ repositories, services })

const { CODES } = require(path.join(basePath, 'errors'))

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