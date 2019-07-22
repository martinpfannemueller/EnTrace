<template>
  <view-header :id="id" :element-name="name">
    <apexchart
      ref="metricChart"
      type="line"
      :series="metrics"
      height="219"
      :options="chartOptions"
      style="margin-top: -20px; margin-bottom: -10px"
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
        <b-input-group append="%" size="sm">
          <b-form-input v-model="percentageThreshold"></b-form-input>
        </b-input-group>
        <div style="margin-top: 0px" class="text-muted interface-text">
          Percentage threshold
        </div>
      </b-col>
      <b-col>
        <b-input-group size="sm" append="sec">
          <b-input-group-prepend is-text>
            <input v-model="cutInterval" type="checkbox" />
          </b-input-group-prepend>
          <b-form-input v-model.number="timeInterval"></b-form-input>
        </b-input-group>
        <div style="margin-top: 0px" class="text-muted interface-text">
          Limit interval
        </div>
      </b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import VueApexCharts from "vue-apexcharts";
import { createNewEvent, store } from "../store/store";
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
          animations: { enabled: false },
          id: "Metric View",
          parentHeightOffset: -5,
          events: {
            updated: function() {
              // Evaluate end time
              let endTime = window.performance.now();
              console.log(endTime);
              store.commit("logEnd", {
                timedEventId: store.state.evaluation.currentTimedEventId,
                endTime: endTime,
                view: "Metric View"
              });
            }
          },
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
          position: "top",
          offsetY: 16,
          fontSize: "10px"
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
          decimalsInFloat: 0,
          min: 0
        }
      },
      showDataLabels: false,
      showMarkers: false,
      cutInterval: true,
      timeInterval: 10,
      percentageThreshold: 100
    };
  },
  computed: {
    metrics() {
      if (
        this.cutInterval &&
        this.$store.state.metricView.timestamps.length >= this.timeInterval
      ) {
        return this.modifiedMetrics;
      } else {
        return this.originalMetrics;
      }
    },
    originalMetrics() {
      return this.$store.state.metricView.metrics;
    },
    modifiedMetrics() {
      let lengthTimestamps = this.$store.state.metricView.timestamps.length;
      let timeInterval = this.timeInterval;
      // Create deep clone because otherwise orignalMetrics will be changed as well since it is only a reference
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
        this.$store.state.metricView.timestamps.length >= this.timeInterval
      ) {
        return this.modifiedTimestamps;
      } else {
        return this.originalTimestamps;
      }
    },
    originalTimestamps() {
      return this.$store.state.metricView.timestamps;
    },
    modifiedTimestamps() {
      let lengthTimestamps = this.$store.state.metricView.timestamps.length;
      let timeInterval = this.timeInterval;
      return this.$store.state.metricView.timestamps.slice(
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
      let checkValueChange = this.checkValueChange;
      this.$store.state.metricView.metrics.forEach(function(d) {
        checkValueChange(d);
      });
      this.changeTimestamps(this.timestamps);
    },
    modifiedTimestamps: function() {
      this.changeTimestamps(this.timestamps);
    }
  },
  methods: {
    // Updates the timestamps by changing the approporiate properties in the options
    changeTimestamps(d) {
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: d
          }
        }
      };
    },
    // Checks whether the threshold values as defined by the user (default 100) is reached, creates an event if it is the case
    checkValueChange(d) {
      let percentageThreshold = this.percentageThreshold;
      if (d.data.length >= 2) {
        let oldValue = d.data[d.data.length - 2];
        let newValue = d.data[d.data.length - 1];
        let higher = Math.max(oldValue, newValue);
        let lower = Math.min(oldValue, newValue);
        if (higher / lower - 1 >= percentageThreshold / 100) {
          createNewEvent(
            "Metric View",
            "Threshold difference reached",
            "For the metric '" +
              d.name +
              "', the new value (" +
              Math.round(newValue * 100) / 100 +
              ")" +
              " differs more than the threshold percentage (" +
              percentageThreshold +
              "%) from the previous value (" +
              Math.round(oldValue * 100) / 100 +
              ")"
          );
        }
      }
    }
  }
};
</script>

<style></style>
