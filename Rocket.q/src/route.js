const express = require('express')
const questionController = require('./controllers/question-controller')
const roomController = require('./controllers/room-controller')
const route = express.Router()

route.get('/', (req, res) => res.render('index', { page: 'home' }))
route.get('/create-pass', (req, res) =>
    res.render('index', { page: 'create-pass' }),
)

route.get('/room/:room', roomController.open)
route.post('/enter-room', roomController.enter)
route.post('/create-room', roomController.create)

route.post('/question/create/:room', questionController.create)
route.post('/question/:id/:question/:action', questionController.index)

module.exports = route
