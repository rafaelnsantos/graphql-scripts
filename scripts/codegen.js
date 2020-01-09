const { codegen } = require('@graphql -codegen/core')
const schema = require('../src/schema')
const typescriptPlugin = require('@graphql-codegen/typescript')
const { printSchema, parse } = require('graphql')
const fs = require('fs')

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
  .then(output => fs.writeFile(path.join(process.cwd(), outputFile), output, () => {
  console.log('Outputs generated!')
  }))
  .catch(err => console.log(err))

