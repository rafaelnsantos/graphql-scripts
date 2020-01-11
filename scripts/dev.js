require('../lib/customModuleLoader')

const nodemon = require('nodemon')
const path = require('path')
const watch = require('node-watch')
const getGraphqlFiles = require('../lib/getGraphQLFiles')

nodemon({
  script: path.join(__dirname, '..', 'src/index'),
  ext: 'ts graphql json',
  env: {
    NODE_ENV: 'dev'
  },
  exec: 'ts-node'
});

let listener

nodemon.on('start', function () {
  console.log('App has started');
  listener = watch(getGraphqlFiles(), () => require('./codegen'))
}).on('quit', function () {
  listener.close()
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  listener.close()
  console.log('App restarted due to: ', files);
});