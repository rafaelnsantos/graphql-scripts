const moduleLoader = require('module');

function CustomModuleLoader () {
  const cOptions = require('../../../tsconfig.json').compilerOptions;

  const replacePaths = {};
  Object.keys(cOptions.paths).forEach(alias => {
    replacePaths[alias.replace(/\*.?/, '(.*)')] = cOptions.paths[alias][0].replace(/\*.?/, '$1');
  });

  moduleLoader._originalResolveFilename = moduleLoader._resolveFilename;

  moduleLoader._resolveFilename = (request, parent, isMain) => {
    Object.keys(replacePaths).forEach(matchString => {
      let regex = new RegExp(matchString);
      if (request.match(regex)) {
        request = [process.cwd(), 'build', request.replace(regex, replacePaths[matchString])].join('/');
      }
    })
    return moduleLoader._originalResolveFilename(request, parent, isMain);
  }
};

module.exports = CustomModuleLoader()