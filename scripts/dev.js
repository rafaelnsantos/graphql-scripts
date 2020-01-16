const nodemon = require('nodemon')
const path = require('path')
const dotenv = require('dotenv')
require('../lib/watchGraphql')

dotenv.config({path: path.join(process.cwd(), '.env.dev')})

nodemon({
  script: path.join(__dirname, '..', 'src/index'),
  ext: 'ts,json',
  env: {
    NODE_ENV: 'dev'
  },
  exec: 'ts-node',
  ignore: ['tests', 'node_modules/**/*'],
  legacyWatch: true,
  args: ['--inspect-brk=0.0.0.0']
});

nodemon.on('start', function () {
}).on('quit', function () {
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});