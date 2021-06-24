const express = require('express')
const server = express()
const route = require('./route')

server.set('view engine', 'ejs')
server.use(route)
server.listen(3000, () => console.log('RODANDO'))
