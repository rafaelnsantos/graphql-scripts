const app = require('./app')
const { createServer } = require('http')
const apollo = require('./apollo')

const PORT = process.env.PORT || 3000

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))

