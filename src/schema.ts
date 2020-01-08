import schemalizer from 'schemalizer'

export const schema = schemalizer(process.cwd(), {
  basePath: 'src/graphql',
  directives: '_directives',
  mode: process.env.NODE_ENV === 'production' ? 'js' : 'ts'
})