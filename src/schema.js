const schemalizer = require('schemalizer')

module.exports = mode => schemalizer(process.cwd(), {
  basePath: process.env.NODE_ENV === 'production' ? 'build/graphql' : 'src/graphql',
  directives: '_directives',
  mode
})
