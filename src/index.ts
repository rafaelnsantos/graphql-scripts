import app from './app'
import { createServer } from 'http'
import apollo from './apollo'

const PORT = process.env.PORT || 3000

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))

