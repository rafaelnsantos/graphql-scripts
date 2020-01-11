const { exportFolder } = require('folder-utils')
const path = require('path')

const { basePath, mode } = require('./config')

module.exports = exportFolder(path.join(basePath, 'services'), '-service', { mode })