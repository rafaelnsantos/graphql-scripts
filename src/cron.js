const { basePath, mode } = require('./config')
const path = require('path')
const { schedule } = require('node-cron')
const { requireFolder } = require('folder-utils')

const cron = ({ services, repositories, utils }) => requireFolder(path.join(basePath, 'cron'), '-cron', { mode, inject: { schedule, services, repositories, utils } })

module.exports = cron