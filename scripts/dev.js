const nodemon = require('nodemon')
const path = require('path')
nodemon({
  script: path.join(__dirname, '..', 'src/index.ts'),
  ext: 'ts graphql json',
  env: {
    "NODE_ENV": "dev"
  }
});

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});