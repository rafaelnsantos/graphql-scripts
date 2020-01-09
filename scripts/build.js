const tsc = require('tsc-prog')
const path = require('path')

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