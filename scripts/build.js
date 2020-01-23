const tsc = require('tsc-prog')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const getGraphqlFiles = require('../lib/getGraphQLFiles')
const createFolder = require('../lib/createFolder')

const buildPath = path.join(process.cwd(), 'build')

rimraf.sync(buildPath)

require('../lib/generateTypes')()

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

createFolder(path.join(buildPath, 'repositories'))
createFolder(path.join(buildPath, 'services'))
createFolder(path.join(buildPath, 'utils'))
createFolder(path.join(buildPath, 'cron'))
createFolder(path.join(buildPath, 'graphql/_directives'))
createFolder(path.join(buildPath, 'graphql/_scalars'))

getGraphqlFiles().map(file => {
  let folder = file.replace('src', 'build')
  if (folder.includes('/')) {
    folder = folder.substring(0, folder.lastIndexOf("/") )
  } else {
    folder =  folder.substring(0, folder.lastIndexOf("\\") )
  }
  createFolder(folder)
  fs.copyFileSync(file, file.replace('src', 'build'))
})
