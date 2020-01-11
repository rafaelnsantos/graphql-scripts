const app = require('./src/app')
const { repositories, services, utils } = require('./src/apollo')
const generateTypes = require('./lib/generateTypes')

module.exports = {
  app,
  repositories,
  services,
  utils,
  generateTypes
}
