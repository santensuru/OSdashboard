$(document).ready(function(){
  var numCPUs, numDisks;
  function a(isFirst) {
    var cpus;
    var totalmem;
    var freemem;
    var cpuusage;
    var disks;

    $.ajax({
      url: "/usage",
      success: function(data) {
        // alert(JSON.stringify(data));
        cpus = data.result.cpus;
        totalmem = data.result.totalmem;
        freemem = data.result.freemem;
        cpuusage = data.result.cpuusage;
        disks = data.result.disks;
	// alert(JSON.stringify(disks));

        if (isFirst) {
          numCPUs = cpus.length;
          numDisks = disks.length;
        }
        return;
      }
    }).done(function() {
      update_cpus(isFirst, cpus);
      // alert(JSON.stringify(freemem) + "/" + JSON.stringify(totalmem));
      update_memory(isFirst, freemem, totalmem);
      update_cpuusage(isFirst, cpuusage);
      update_disks(isFirst, disks);
    });
  }

  // first run
  a(true);

  var intervalId = window.setInterval(function(){
    /// call your function here
    a(false);
  }, 2000);

  var myCPUsCharts = [];
  var myMemChart;
  var myCPUusageChart;
  var myDisksCharts = [];

  function update_cpus(isFirst, json) {
    // alert(json.result.length);
    var i=0;
    for (i=0; i<json.length; i++) {

      if (isFirst) {
        $('#cpus').append("<div class='widget d-none'><h1>CPU-" + i + " ticks</h1><canvas id='cpu_" + i + "' width='400' height='390' /></div>");

        var ctx = document.getElementById('cpu_' + i).getContext('2d');
        //var json = JSON.parse(a());
        
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['user', 'nice', 'sys', 'idle', 'irq'],
            datasets: [{
              label: 'cpu times',
              data: [
                json[i].times.user,
                json[i].times.nice,
                json[i].times.sys,
                json[i].times.idle,
                json[i].times.irq
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            }
          }
        });

        myCPUsCharts.push(myChart);
      } else {
        // console.log(myCPUsCharts.length);
        updateData(myCPUsCharts[i],
          [
            json[i].times.user,
            json[i].times.nice,
            json[i].times.sys,
            json[i].times.idle,
            json[i].times.irq
          ]);
      }
    }
  }

  function update_memory(isFirst, free=0, total=0) {
    // alert(json.result.length);
    // console.log("free: " + free + ", total: " + total);
    if (isFirst) {
      $('#cpus').append("<div class='widget'><h1>Memory usage</h1><canvas id='mem' width='400' height='390' /></div>");

      var ctx = document.getElementById('mem').getContext('2d');
      //var json = JSON.parse(a());
      
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['used', 'unused'],
          datasets: [{
            label: 'memory',
            data: [
              ((total - free) / 1024 / 1024 / 1024).toPrecision(3),
              (free / 1024 / 1024 / 1024).toPrecision(3)
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          }
        }
      });

      myMemChart = myChart;
    } else {
      updateData(myMemChart,
        [
          ((total - free) / 1024 / 1024 / 1024).toPrecision(3),
          (free / 1024 / 1024 / 1024).toPrecision(3)
        ]);
    }
  }

  function update_cpuusage(isFirst, usage=0) {
    // alert(json.result.length);
    if (isFirst) {
      $('#cpus').append("<div class='widget'><h1>CPU usage</h1><canvas id='cpuu' width='400' height='390' /></div>");

      var ctx = document.getElementById('cpuu').getContext('2d');
      //var json = JSON.parse(a());
      
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['utilized', 'idle'],
          datasets: [{
            label: 'cpu',
            data: [
              (usage).toPrecision(3),
              (100 - usage).toPrecision(3)
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          legend: {
            display: false
          }
        }
      });

      myCPUusageChart = myChart;
    } else {
      updateData(myCPUusageChart,
        [
          (usage).toPrecision(3),
          (100 - usage).toPrecision(3)
        ]);
    }
  }

  function update_disks(isFirst, json) {
    // alert(json.result.length);
    // alert(JSON.stringify(json));
    var i=0;
    for (i=0; i<json.length; i++) {

      if (isFirst) {
        $('#cpus').append("<div class='widget'><h1>Drive " + json[i]._mounted + " usage</h1><canvas id='disk_" + i + "' width='400' height='390' /></div>");

        var ctx = document.getElementById('disk_' + i).getContext('2d');
        //var json = JSON.parse(a());
        
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['used', 'free'],
            datasets: [{
              label: 'disk',
              data: [
                (json[i]._used / 1024 / 1024 / 1024).toPrecision(3),
                (json[i]._available / 1024 / 1024 / 1024).toPrecision(3)
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            }
          }
        });

        myDisksCharts.push(myChart);
      } else {
        // console.log(myCPUsCharts.length);
        updateData(myDisksCharts[i],
          [
            (json[i]._used / 1024 / 1024 / 1024).toPrecision(3),
            (json[i]._available / 1024 / 1024 / 1024).toPrecision(3)
          ]);
      }
    }
  }

  function updateData(chart, data) {
    var i = 0;
    for (i=0; i<chart.data.datasets[0].data.length; i++) {
          chart.data.datasets[0].data[i] = data[i];
      }
      chart.update();
  }

  $('.video_btn input').change(function() {
    // this will contain a reference to the checkbox  
    // alert(this.value); 
    var i;
    if (this.checked) {
      // the checkbox is now checked 
      // alert($('cpu_0').parent().parent());
      if (this.value == 0) {
        for (i=0; i<numCPUs; i++) {
          $('#cpu_'+i).parent().removeClass("d-none");
        }
      } else if (this.value == 1) {
          $('#mem').parent().removeClass("d-none");
      } else if (this.value == 2) {
          $('#cpuu').parent().removeClass("d-none");
      } else if (this.value == 3) {
        for (i=0; i<numDisks; i++) {
          $('#disk_'+i).parent().removeClass("d-none");
        }
      }
    } else {
      // the checkbox is now no longer checked
      if (this.value == 0) {
        for (i=0; i<numCPUs; i++) {
          $('#cpu_'+i).parent().addClass("d-none");
        }
      } else if (this.value == 1) {
          $('#mem').parent().addClass("d-none");
      } else if (this.value == 2) {
          $('#cpuu').parent().addClass("d-none");
      } else if (this.value == 3) {
        for (i=0; i<numDisks; i++) {
          $('#disk_'+i).parent().addClass("d-none");
        }
      }
    }
  });
});
