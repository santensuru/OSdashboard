/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , static = require('serve-static')
  , os = require('os');


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(static(__dirname + '/public'))

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

app.get('/cpus', function (req, res, next) {
  var param = {"result":os.cpus()};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

app.get('/totalmem', function (req, res, next) {
  var param = {"result":os.totalmem()};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

app.get('/freemem', function (req, res, next) {
  var param = {"result":os.freemem()};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
})

app.listen(3000)