const schemalizer = require('schemalizer')

module.exports = schemalizer(process.cwd(), {
  basePath: process.env.NODE_ENV === 'production' ? 'build/graphql' : 'src/graphql',
  directives: '_directives',
  mode: process.env.NODE_ENV === 'production' ? 'js' : 'ts'
})
