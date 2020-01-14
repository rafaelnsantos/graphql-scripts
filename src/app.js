const { isProduction, mode } = require('./config')

const express = require('express')
const apollo = require('./apollo')

function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, Recaptcha')
  
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  
  next()
}

const app = express()

app.use(cors)

if (!isProduction) {
  const schema = require('./schema')(mode)
  app.get('/graphql/schema', (req, res) => res.send(schema.typeDefs))
}

apollo.applyMiddleware({ app: app })

module.exports = app

