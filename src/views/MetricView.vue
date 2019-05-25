<template>
  <view-header :elementName="name">
    <metric-chart :height="150" :width="600" :chart-data="configData" :options="configOptions"></metric-chart>
    <b-button size="sm" variant="primary" @click="drawIt">Test function</b-button>
  </view-header>
</template>

<script>
import ViewHeader from "./ViewHeader.vue";
import MetricChart from "./MetricChart";
export default {
  data() {
    return {
      name: "Metric View",
      configData: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            data: [32, 42, 53, 53, 5, 2, 52, 51, 53]
          }
        ]
      },
      configOptions: {
        responsive: true,
        title: {
          display: false,
          text: "Metric Chart"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Metric Performance"
              }
            }
          ]
        }
      }
    };
  },
  components: {
    "view-header": ViewHeader,
    "metric-chart": MetricChart
  },
  methods: {
    drawIt() {
      // MetricChart.drawChart();
      console.log("hallo es wurde der button geklickt");
      this.configData.labels.push("3");
      this.configData.datasets[0].data.push(312);
      console.log(this.configData.datasets[0].data);
      this.$emit("dataChanged");
    }
  }
};
</script> 

<style>
</style>
