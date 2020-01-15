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
  legacyWatch: true
});

nodemon.on('start', function () {
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});