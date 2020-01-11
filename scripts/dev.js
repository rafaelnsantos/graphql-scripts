const nodemon = require('nodemon')
const path = require('path')
require('../lib/watchGraphql')

nodemon({
  script: path.join(__dirname, '..', 'src/index'),
  ext: 'ts json',
  env: {
    NODE_ENV: 'dev'
  },
  exec: 'ts-node'
});

nodemon.on('start', function () {
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});