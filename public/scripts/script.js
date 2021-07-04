$(document).ready(function(){
  function a(isFirst) {
    var cpus;
    var totalmem;
    var freemem;
    var cpuusage;

    $.ajax({
      url: "/usage",
      success: function(data) {
        // alert(JSON.stringify(data));
        cpus = data.result.cpus;
        totalmem = data.result.totalmem;
        freemem = data.result.freemem;
        cpuusage = data.result.cpuusage;
        return;
      }
    }).done(function() {
      update_cpus(isFirst, cpus);
      // alert(JSON.stringify(freemem) + "/" + JSON.stringify(totalmem));
      update_memory(isFirst, freemem, totalmem);
      update_cpuusage(isFirst, cpuusage);
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

  function update_cpus(isFirst, json) {
    // alert(json.result.length);
    var i=0;
    for (i=0; i<json.length; i++) {

      if (isFirst) {
        $('#cpus').append("<div class='widget'><h1>CPU-" + i + " ticks</h1><canvas id='cpu_" + i + "' width='400' height='390' /></div>");

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

  function update_memory(isFirst, free, total) {
    // alert(json.result.length);
    if (isFirst) {
      $('#cpus').append("<div class='widget'><h1>Memory usage</h1><canvas id='mem' width='400' height='390' /></div>");

      var ctx = document.getElementById('mem').getContext('2d');
      //var json = JSON.parse(a());
      
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['used', 'free'],
          datasets: [{
            label: 'memory',
            data: [
              total - free,
              free
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
          total - free,
          free
        ]);
    }
  }

  function update_cpuusage(isFirst, usage) {
    // alert(json.result.length);
    if (isFirst) {
      $('#cpus').append("<div class='widget'><h1>CPU usage</h1><canvas id='cpuu' width='400' height='390' /></div>");

      var ctx = document.getElementById('cpuu').getContext('2d');
      //var json = JSON.parse(a());
      
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['used', 'free'],
          datasets: [{
            label: 'memory',
            data: [
              usage,
              100 - usage
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
          usage,
          100 - usage
        ]);
    }
  }

  function updateData(chart, data) {
    var i = 0;
    for (i=0; i<chart.data.datasets[0].data.length; i++) {
          chart.data.datasets[0].data[i] = data[i];
      }
      chart.update();
  }
});