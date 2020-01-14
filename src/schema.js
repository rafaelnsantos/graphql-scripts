const schemalizer = require('schemalizer')
const { isProduction } = require('./config')

module.exports = mode => schemalizer(process.cwd(), {
  basePath: isProduction ? 'build/graphql' : 'src/graphql',
  directives: '_directives',
  mode
})
