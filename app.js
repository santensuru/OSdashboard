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
  , osu = require('node-os-utils')
  , nodeDiskInfo = require('node-disk-info');


var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

var isFirst = true;
var count = 0;

app.get('/', function (req, res) {
  if (isFirst) {
    updateUtilization();
  }
  res.render('index',
  { title : 'Home' }
  )
});

var cpus, totalmem, freemem, cpuusage, disksutilization;

app.get('/usage', function (req, res, next) {
  if (count >= 5) {
    setInterval(updateUtilization, 2000);
  }
  count = 0;
  var param = {"result": {
    "cpus": cpus, 
    "totalmem": totalmem, 
    "freemem": freemem,
    "cpuusage": cpuusage,
    "disks": disksutilization
  }};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param)
});

function updateUtilization() {
  cpus = os.cpus(); 
  totalmem = os.totalmem(); 
  freemem = os.freemem();
  gotCpu();
  gotDisk();

  isFirst = false;
  count++;

  console.log("run");
  if (count >= '5') {
    clearInterval(this);
    console.log("stop");
  }
  console.log(count);
}
setInterval(updateUtilization, 2000);

function gotCpu() {
  osu.cpu.usage()
  .then(cpuPercentage => {
    cpuusage = cpuPercentage; // 10.38
  });
}

function gotDisk() {
  nodeDiskInfo.getDiskInfo()
  .then(disks => {
    disksutilization = disks;
  })
  .catch(reason => {
    console.error(reason);
  });
}

app.listen(3000);