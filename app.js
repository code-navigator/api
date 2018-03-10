const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');

// establish a reference to Express exports
const app = express()

// set up middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'ddfffaseoiwersdkjfsdfa',
  resave: false,
  saveUninitialized: false
}))
app.use(cors())

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')))

// mount route pages
app.use('/', require('./routes'))

module.exports = app