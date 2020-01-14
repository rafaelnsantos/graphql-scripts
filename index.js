const app = require('./src/app')
const repositories = require('./src/repositories')
const services = require('./src/services')
const utils = require('./src/utils')
const generateTypes = require('./lib/generateTypes')

function createQuery (query) {
  return {
    query
  }
}

module.exports = {
  app,
  repositories,
  services,
  utils,
  generateTypes,
  createQuery
}
