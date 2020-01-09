const { codegen } = require('@graphql-codegen/core')
const { printSchema, parse, buildSchema } = require('graphql')
const schema = buildSchema(require('../src/schema').typeDefs)
const typescriptPlugin = require('@graphql-codegen/typescript')
const fs = require('fs')
const path = require('path')


const outputFile = 'src/generated/schema.ts'
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
    console.log('tipos gerados com sucesso')
  })
  .catch(err => console.log(err))

