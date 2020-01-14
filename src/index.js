if (process.env.NODE_ENV === 'dev') {
  const dotenv = require('dotenv')
  const path = require('path')
  dotenv.config({ path: path.join(process.cwd(), '.env.development') })
}

const app = require('./app')
const { createServer } = require('http')
const apollo = require('./apollo')

const { port } = require('./config')

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(port, () => console.log(`listening on port ${port}`))

