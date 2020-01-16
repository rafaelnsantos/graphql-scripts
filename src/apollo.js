const { basePath, mode } = require('./config')

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const path = require('path')
const schema = require('./schema')(mode)
const formatError = require('./formatError')
const repositories = require('./repositories')
const services = require('./services')
const utils = require('./utils')({ repositories, services })

// todo: figure out how to test cron jobs
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev') {
  require('./cron')({ services, repositories, utils })
}
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