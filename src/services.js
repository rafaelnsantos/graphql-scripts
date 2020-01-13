const { exportFolder } = require('folder-utils')
const path = require('path')

const { basePath, mode } = require('./config')

const services = exportFolder(path.join(basePath, 'services'), '-service', { mode })

module.exports = services