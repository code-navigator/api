const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');

// establish a reference to Index page routes
const index = require('./routes/index')

// establish a reference to Express exports
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware for logger
// app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'ddfffaseoiwersdkjfsdfa',
  resave: false,
  saveUninitialized: false
}))

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')))

// create virtual path prefixes for external static files
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery-ui-dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jstree/dist')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery.splitter/js')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/jquery-ui-dist')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/jquery.splitter/css')))

app.use('/css', express.static(path.join(__dirname, '/node_modules/jstree/dist/themes/default')))
app.use(cors())

// mount route pages
app.use('/', index)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

module.exports = app