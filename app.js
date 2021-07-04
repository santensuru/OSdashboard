/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , static = require('serve-static')
  , os = require('os')
  , osu = require('node-os-utils');


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
));
app.use(static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

var cpuUsage;

app.get('/usage', function (req, res, next) {
  gotCpu();
  var param = {"result": {
    "cpus": os.cpus(), 
    "totalmem": os.totalmem(), 
    "freemem": os.freemem(),
    "cpuusage": cpuUsage
  }};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
});

function gotCpu() {
  osu.cpu.usage()
  .then(cpuPercentage => {
    cpuUsage = cpuPercentage; // 10.38
  });
}

app.listen(3000);