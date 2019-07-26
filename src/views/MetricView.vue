<template>
  <view-header :id="id" :element-name="name">
    <div id="metric-view"></div>
    <b-row>
      <b-col cols="2"> </b-col>
      <b-col>
        <b-input-group append="%" size="sm">
          <b-form-input v-model.number="thresholdPercentage"></b-form-input>
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
      <b-col cols="2"> </b-col>
    </b-row>
  </view-header>
</template>

<script>
import * as c3 from "c3";
import ViewHeader from "../helper_components/ViewHeader";
import { createNewEvent, store } from "../store/store";
export default {
  components: {
    "view-header": ViewHeader
  },
  data() {
    return {
      name: "Metric View",
      id: 1,
      cutInterval: true,
      timeInterval: 10,
      bindedChart: ""
    };
  },
  computed: {
    metrics() {
      return this.$store.state.metricView.metrics;
    },
    modifiedMetrics() {
      if (this.cutInterval) {
        let helperMetrics = JSON.parse(JSON.stringify(this.metrics));
        let timeInterval = this.timeInterval + 1; // Adjust by one
        for (let i = 0; i < helperMetrics.length; i++) {
          helperMetrics[i].splice(1, helperMetrics[i].length - timeInterval);
        }
        return helperMetrics;
      } else {
        return this.metrics;
      }
    },
    thresholdPercentage: {
      get() {
        return this.$store.state.metricView.thresholdPercentage;
      },
      set(value) {
        this.$store.commit("updateThresholdPercentage", value);
      }
    }
  },
  watch: {
    modifiedMetrics(val) {
      this.renderMetricChart(val);
    },
    cutInterval: function() {
      this.renderMetricChart(this.modifiedMetrics);
    }
  },
  mounted() {
    // Initilaiez the chart, bind it to "bindedChart"
    this.bindedChart = c3.generate({
      bindto: "#metric-view",
      size: {
        width: 640,
        height: 190
      },
      axis: {
        x: {
          height: 20,
          tick: {
            outer: false,
            culling: {
              max: 40
            }
          }
        },
        y: {
          tick: {
            outer: false
          }
        }
      },
      data: {
        x: "timestamps",
        columns: [],
        labels: false
      },
      color: {
        pattern: [
          "#1f77b4",
          "#aec7e8",
          "#ff7f0e",
          "#ffbb78",
          "#2ca02c",
          "#98df8a",
          "#d62728",
          "#ff9896",
          "#9467bd",
          "#c5b0d5",
          "#8c564b",
          "#c49c94",
          "#e377c2",
          "#f7b6d2",
          "#7f7f7f",
          "#c7c7c7",
          "#bcbd22",
          "#dbdb8d",
          "#17becf",
          "#9edae5"
        ]
      },
      transition: {
        duration: 350
      },
      legend: {
        position: "inset"
      }
    });
  },
  methods: {
    // Checks whether the threshold values as defined by the user (default 100) is reached, creates an event if it is the case
    renderMetricChart(chartData) {
      this.bindedChart.load({
        columns: chartData
      });
      // Evaluate end time
      store.commit("logEnd", {
        timedEventId: store.state.evaluation.currentTimedEventId,
        endTime: window.performance.now(),
        view: "Metric View"
      });
    },
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

<style>
.c3-line {
  stroke-width: 3px !important;
}
.c3-circle {
  r: 4px;
}
</style>
