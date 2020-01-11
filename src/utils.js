const { exportFolder } = require('folder-utils')
const path = require('path')

const { basePath, mode } = require('graphql-api-scripts/src/config')

const repositories = require('./repositories')
const services = require('./services')

module.exports = exportFolder(path.join(basePath, 'utils'), '-util', { inject: { repositories, services }, mode })