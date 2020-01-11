const tsc = require('tsc-prog')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const getGraphqlFiles = require('../lib/getGraphQLFiles')

const buildPath = path.join(process.cwd(), 'build')

rimraf.sync(buildPath)

tsc.build({
  basePath: process.cwd(), // always required, used for relative paths
  configFilePath: 'tsconfig.json', // config to inherit from (optional)
  compilerOptions: {
      rootDir: 'src',
      outDir: 'build',
      declaration: false,
      skipLibCheck: true,
      target: 'es2016',
      module: 'commonjs',
      moduleResolution: 'node'
  },
  include: ['src/**/*'],
  exclude: ['**/*.test.ts', '**/*.spec.ts'],
})

getGraphqlFiles().map(file => {
  let folder = file.replace('src', 'build')
  folder = folder.substring(0, folder.lastIndexOf("/") )
  fs.mkdirSync(folder, { recursive: true })
  fs.copyFile(file, file.replace('src', 'build'), err => {
    if (err) console.log(err)
  })
})
