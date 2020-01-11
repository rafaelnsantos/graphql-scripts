if (process.env.NODE_ENV === 'dev') {
  const dotenv = require('dotenv')
  const path = require('path')
  dotenv.config({ path: path.join(process.cwd(), '.env.development') })
}
require('../lib/customModuleLoader')

const app = require('./app')
const { createServer } = require('http')
const apollo = require('./apollo')

const PORT = process.env.PORT || 3000

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))

