<script>
import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

export default {
  name: 'UserStats'
}
</script>


<template>
  <div>
    <h1>User Stats</h1>
  </div>
  <canvas id="myChart"></canvas>
</template>
