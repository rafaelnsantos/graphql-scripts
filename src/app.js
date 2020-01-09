const express = require('express')
const apollos = require('./apollo')
const schemaa = require('./schema')

function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, Recaptcha')

  if (req.method === 'OPTIONS') return res.sendStatus(200)

  next()
}

const appp = express()

appp.use(cors)

if (process.env.NODE_ENV !== 'production') {
  appp.get('/graphql/schema', (req, res) => res.send(schemaa.typeDefs))
}

apollos.applyMiddleware({ app: appp })

module.exports = appp

