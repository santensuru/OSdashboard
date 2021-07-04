$(document).ready(function(){
  function a(isFirst) {
    var cpus;
    var totalmem;
    var freemem;

    $.ajax({
      url: "/cpus",
      success: function(data) {
        // alert(JSON.stringify(data));
        // update_cpus(isFirst, data);
        cpus = data;
        return;
      }
    }).done(function() {
      $.ajax({
        url: "/totalmem",
        success: function(data) {
          // alert(JSON.stringify(data));
          totalmem = data;
          return;
        }
      }).done(function() {
        $.ajax({
          url: "/freemem",
          success: function(data) {
            // alert(JSON.stringify(data));
            freemem = data;
            return;
          }
        }).done(function() {
          update_cpus(isFirst, cpus);
          // alert(JSON.stringify(freemem) + "/" + JSON.stringify(totalmem));
          update_memory(isFirst, freemem.result, totalmem.result);
        });
      });
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

  function update_cpus(isFirst, json) {
    // alert(json.result.length);
    var i=0;
    for (i=0; i<json.result.length; i++) {

      if (isFirst) {
        $('#cpus').append("<div class='widget'><h1>CPU-" + i + "</h1><canvas id='cpu_" + i + "' width='400' height='400' /></div>");

        var ctx = document.getElementById('cpu_' + i).getContext('2d');
        //var json = JSON.parse(a());
        
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['user', 'nice', 'sys', 'idle', 'irq'],
            datasets: [{
              label: 'cpu times',
              data: [
                json.result[i].times.user,
                json.result[i].times.nice,
                json.result[i].times.sys,
                json.result[i].times.idle,
                json.result[i].times.irq
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
          }
        });

        myCPUsCharts.push(myChart);
      } else {
        // console.log(myCPUsCharts.length);
        updateData(myCPUsCharts[i],
          [
            json.result[i].times.user,
            json.result[i].times.nice,
            json.result[i].times.sys,
            json.result[i].times.idle,
            json.result[i].times.irq
          ]);
        // console.log(i, json.result[i].times.user,
        //     json.result[i].times.nice,
        //     json.result[i].times.sys,
        //     json.result[i].times.idle,
        //     json.result[i].times.irq);
      }
    }
  }

  function update_memory(isFirst, free, total) {
    // alert(json.result.length);
    if (isFirst) {
      $('#cpus').append("<div class='widget'><h1>Mem</h1><canvas id='mem' width='400' height='400' /></div>");

      var ctx = document.getElementById('mem').getContext('2d');
      //var json = JSON.parse(a());
      
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['used', 'free'],
          datasets: [{
            label: 'cpu times',
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

  function updateData(chart, data) {
    var i = 0;
    for (i=0; i<chart.data.datasets[0].data.length; i++) {
          chart.data.datasets[0].data[i] = data[i];
      }
      chart.update();
  }
});