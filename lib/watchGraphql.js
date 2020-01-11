const watchman = require('fb-watchman');
const generateTypes = require('./generateTypes')
const path = require('path')

const client = new watchman.Client();

const dir_of_interest = path.join(process.cwd(), 'src/graphql');

client.capabilityCheck({optional:[], required:['relative_root']},
  function (error, resp) {
    if (error) {
      console.log(error);
      client.end();
      return;
    }

    // Initiate the watch
    client.command(['subscribe', dir_of_interest, 'mysubscription', {
      expression: ["match", "*.graphql"]
    }],
    function(error, resp) {
      if (error) {
        // Probably an error in the subscription criteria
        console.log('failed to subscribe: ', error);
        return;
      }
    });

    client.on('subscription', function(resp) {
      if(resp.subscription === 'mysubscription') generateTypes()
    });
  }
);