const generateTypes = require('./generateTypes')
const path = require('path')
const watch = require('gulp-watch')

const graphqlDir = path.join(process.cwd(), 'src/graphql');

watch([`${graphqlDir}/**/*.graphql`], generateTypes);