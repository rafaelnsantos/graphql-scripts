const app = require('./src/app')
const repositories = require('./src/repositories')
const services = require('./src/services')
const utils = require('./src/utils')
const generateTypes = require('./lib/generateTypes')

module.exports = {
  app,
  repositories,
  services,
  utils,
  generateTypes
}
