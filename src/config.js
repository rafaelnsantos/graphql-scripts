const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  isProduction,
  mode: isProduction ? 'js' : 'ts',
  basePath: path.join(process.cwd(), isProduction ? 'build' : 'src'),
  port: process.env.PORT || 3000
}