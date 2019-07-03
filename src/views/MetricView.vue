<template>
  <view-header :id="id" :element-name="name">
    <apexchart
      ref="metricChart"
      type="line"
      :series="metrics"
      height="210"
      :options="chartOptions"
    ></apexchart>
    <b-row>
      <b-col>
        <b-form-checkbox v-model="showDataLabels" class="interface-text" switch
          >Data labels</b-form-checkbox
        >
      </b-col>
      <b-col>
        <b-form-checkbox v-model="showMarkers" class="interface-text" switch
          >Data marker</b-form-checkbox
        >
      </b-col>
      <b-col>
        <b-form-checkbox v-model="cutInterval" class="interface-text" switch
          >Limit to last x s</b-form-checkbox
        >
      </b-col>
      <b-col>
        <b-form-input v-model="timeInterval" size="sm"></b-form-input>
      </b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    "view-header": ViewHeader,
    apexchart: VueApexCharts
  },
  data() {
    return {
      name: "Metric View",
      id: 1,
      chartOptions: {
        chart: {
          id: "Metric View",
          parentHeightOffset: -5,
          toolbar: {
            show: false
          }
        },
        theme: {
          palette: "palette1"
        },
        dataLabels: {
          enabled: false,
          formatter: function(val) {
            return Math.round(val);
          }
        },
        markers: {
          size: 0,
          shape: "circle",
          radius: 3
        },
        stroke: {
          show: true,
          curve: "smooth",
          width: 5
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: "bottom"
        },
        xaxis: {
          categories: [],
          labels: {
            hideOverlappingLabels: true
          }
        },
        yaxis: {
          forceNiceScale: true,
          show: true,
          decimalsInFloat: 0
        }
      },
      showDataLabels: false,
      showMarkers: false,
      cutInterval: true,
      timeInterval: 20,
      adjustedMetrics: []
    };
  },
  computed: {
    metrics() {
      if (
        this.cutInterval &&
        this.$store.state.timestamps.length >= this.timeInterval
      ) {
        return this.modifiedMetrics;
      } else {
        return this.originalMetrics;
      }
    },
    originalMetrics() {
      return this.$store.state.metrics;
    },
    modifiedMetrics() {
      let lengthTimestamps = this.$store.state.timestamps.length;
      let timeInterval = this.timeInterval;
      let helperMetrics = JSON.parse(JSON.stringify(this.originalMetrics));
      helperMetrics.forEach(function(d, index) {
        d.data = helperMetrics[index].data.slice(
          lengthTimestamps - timeInterval,
          lengthTimestamps
        );
      });
      return helperMetrics;
    },
    timestamps() {
      if (
        this.cutInterval &&
        this.$store.state.timestamps.length >= this.timeInterval
      ) {
        return this.modifiedTimestamps;
      } else {
        return this.originalTimestamps;
      }
    },
    originalTimestamps() {
      return this.$store.state.timestamps;
    },
    modifiedTimestamps() {
      let lengthTimestamps = this.$store.state.timestamps.length;
      let timeInterval = this.timeInterval;
      return this.$store.state.timestamps.slice(
        lengthTimestamps - timeInterval,
        lengthTimestamps
      );
    }
  },
  watch: {
    showDataLabels: function(val) {
      if (val) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            dataLabels: {
              enabled: true
            }
          }
        };
      } else {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            dataLabels: {
              enabled: false
            }
          }
        };
      }
    },
    showMarkers: function(val) {
      if (val) {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            markers: {
              size: 5
            }
          }
        };
      } else {
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            markers: {
              size: 0
            }
          }
        };
      }
    },
    cutInterval: function() {
      this.changeTimestamps(this.timestamps);
      this.$refs.metricChart.updateSeries();
    },
    originalTimestamps: function() {
      this.changeTimestamps(this.timestamps);
    },
    modifiedTimestamps: function() {
      this.changeTimestamps(this.timestamps);
    }
  },
  methods: {
    changeTimestamps(d) {
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: d
          }
        }
      };
    }
  }
};
</script>

<style></style>
