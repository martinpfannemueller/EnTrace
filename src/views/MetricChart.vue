<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["options"],
  data() {
    return {
      colorIndex: 0,
      maxDataPointAmount: 10,
      removeOldesDataPoint: true
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  updated() {
    this.renderChart(this.chartData, this.options);
  },
  methods: {
    drawChart() {}
  }
};
</script> 
