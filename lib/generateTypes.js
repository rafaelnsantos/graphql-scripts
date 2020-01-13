const { codegen } = require('@graphql-codegen/core')
const { printSchema, parse, buildSchema } = require('graphql')
const schemalizer = require('schemalizer')
const typescriptPlugin = require('@graphql-codegen/typescript')
const fs = require('fs')
const path = require('path')

const outputFile = 'src/generated/schema.ts'



function generateTypes () {
  const schema = schemalizer(process.cwd(), {
    basePath: 'src/graphql',
    directives: '_directives',
    mode: 'js'
  }).typeDefs

  const config = {
    // used by a plugin internally, although the 'typescript' plugin currently
    // returns the string output, rather than writing to a file
    filename: outputFile,
    schema: parse(printSchema(schema)), 
    plugins: [ // Each plugin should be an object
      {
        typescript: {}, // Here you can pass configuration to the plugin
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
    },
  }
  codegen(config)
    .then(output => {
      fs.writeFileSync(path.join(process.cwd(), outputFile), output)
    })
    .catch(err => console.log(err))
}

module.exports = generateTypes
