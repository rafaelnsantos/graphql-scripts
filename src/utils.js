const { exportFolder } = require('folder-utils')
const path = require('path')

const { basePath, mode } = require('./config')

const utils = ({ repositories, services }) => exportFolder(path.join(basePath, 'utils'), '-util', { inject: { repositories, services }, mode })

module.exports = utils