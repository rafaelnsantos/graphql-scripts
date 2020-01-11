const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'js' : 'ts'

const path = require('path')

const basePath = path.join(process.cwd(), isProduction ? 'build' : 'src')

module.exports = {
  isProduction,
  mode,
  basePath
}