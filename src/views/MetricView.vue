<template>
  <view-header :elementName="name">
    <apexchart width="650" height="175" type="line" :options="chartOptions" :series="metrics"></apexchart>
  </view-header>
</template>

<script>
import ViewHeader from "./ViewHeader.vue";
import VueApexCharts from "vue-apexcharts";
export default {
  data() {
    return {
      name: "Metric View",
      chartOptions: {
        chart: {
          id: "Metric View"
        },
        stroke: {
          show: true,
          curve: "smooth",
          // lineCap: "butt",
          width: 5
        },
        legend: {
          show: true,
          position: "bottom"
        },
        markers: {
          size: 5,
          colors: undefined,
          strokeColor: "#fff",
          strokeWidth: 2,
          strokeOpacity: 0.9,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0
        },
        xaxis: {
          //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        yaxis: {
          forceNiceScale: true,
          show: true,
          decimalsInFloat: 0
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ]
    };
  },
  computed: {
    metrics() {
      return this.$store.state.metrics;
    }
  },
  components: {
    "view-header": ViewHeader,
    apexchart: VueApexCharts
  },
  methods: {}
};
</script>

<style>
</style>
