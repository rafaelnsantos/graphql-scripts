const nodemon = require('nodemon')

nodemon({
  script: 'src/index.ts',
  ext: 'ts graphql json',
  exec: 'ts-node'
});

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});