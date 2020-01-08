import express from 'express'
import apollo from './apollo'
console.log(process.cwd())
// import { schema } from './schema'

function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, Recaptcha')

  if (req.method === 'OPTIONS') return res.sendStatus(200)

  next()
}

const app = express()

app.use(cors)

if (process.env.NODE_ENV !== 'production') {
  // app.get('/graphql/schema', (req, res) => res.send(schema.typeDefs))
}

apollo.applyMiddleware({ app })

export default app

