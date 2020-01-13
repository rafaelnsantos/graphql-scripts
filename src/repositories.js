const { exportFolder } = require('folder-utils')
const path = require('path')

const { basePath, mode } = require('./config')

const repositories = exportFolder(path.join(basePath, 'repositories'), '-repository', { mode })

module.exports = repositories