const tsc = require('tsc-prog')
const path = require('path')
const fs = require('fs')

tsc.build({
  basePath: process.cwd(), // always required, used for relative paths
  configFilePath: 'tsconfig.json', // config to inherit from (optional)
  compilerOptions: {
      rootDir: 'src',
      outDir: 'build',
      declaration: true,
      skipLibCheck: true,
  },
  include: ['src/**/*'],
  exclude: ['**/*.test.ts', '**/*.spec.ts'],
})

function recFindByExt (base, ext, files, result) {
  files = files || fs.readdirSync(base) 
  result = result || [] 

  files.forEach( 
      function (file) {
          var newbase = path.join(base,file)
          if ( fs.statSync(newbase).isDirectory() )
          {
              result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
          }
          else
          {
              if ( file.substr(-1*(ext.length+1)) == '.' + ext )
              {
                  result.push(newbase)
              } 
          }
      }
  )
  return result
}


const graphqlFiles = recFindByExt(path.join(process.cwd(), 'src/graphql'), 'graphql')

graphqlFiles.map(async file => {
  console.log('copiando arquivo', file)
  fs.copyFile(file, file.replace('src', 'build'), err => {
    if (err) console.log(err)
  })
})
