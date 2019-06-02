<template>
  <view-header :elementName="name">
    <svg id="network-view" :width="width" :height="height" margin="auto"></svg>
  </view-header>
</template>

<script>
import ViewHeader from "./ViewHeader.vue";
import * as d3 from "d3";
export default {
  data() {
    return {
      name: "Network View",
      width: 650,
      height: 600,
      networkViewSVG: ""
    };
  },
  components: {
    "view-header": ViewHeader
  },
  mounted() {
    this.initializeSelector();
    // this.renderNetwork(this.nodes, this.edges);
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
    edges() {
      return this.$store.state.edges;
    }
  },
  watch: {
    nodes: function(val) {
      this.renderNetwork(this.nodes, this.edges);
    },
    edges: function(val) {
      this.renderNetwork(this.nodes, this.edges);
    }
  },
  methods: {
    initializeSelector() {
      let cfmHelper = d3
        .selectAll("#network-view")
        .call(
          d3.zoom().on("zoom", function(d) {
            cfmHelper.attr("transform", d3.event.transform);
          })
        )
        .on("dblclick.zoom", null) // Prevent zoom on double click
        .append("g")
        .attr("transform", "translate(10, 5)");
      this.networkViewSVG = cfmHelper;
    },
    renderForceNetwork(nodes, edges) {
      console.log("Start to render the forced Network View ");
    },
    renderNetwork(nodes, edges) {
      console.log("Start to render the Network View ");

      // Using standard D3

      // Load positions of nodes into edges
      edges.forEach(function(d) {
        var indexSource = nodes.findIndex(x => x.nodeId === d.sourceId);
        var indexTarget = nodes.findIndex(x => x.nodeId === d.targetId);
        d.sourceIdx = nodes[indexSource].x;
        d.sourceIdy = nodes[indexSource].y;
        d.targetIdx = nodes[indexTarget].x;
        d.targetIdy = nodes[indexTarget].y;
      });

      var helperNode = this.networkViewSVG
        .selectAll("circle")
        .data(this.nodes, function(d) {
          return d.nodeId;
        });
      var helperEdge = this.networkViewSVG
        .selectAll("line")
        .data(this.edges, function(d) {
          return d.edgeId;
        });

      // ENTER Section
      var edgeEnter = helperEdge
        .enter()
        .append("line");
      var nodeEnter = helperNode
        .enter()
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", "blue")
        .attr("opacity", 0)
        .attr("r", 0);

      // UPDATE Section
      var edgeUpdate = edgeEnter.merge(helperEdge);
      edgeUpdate
        .transition()
        .duration(1000)
        .attr("id", function(d) {
          return d.edgeId;
        })
        .attr("stroke", "black")
        .attr("stroke-width", function(d) {
          return 1;
        })
        .attr("x1", function(d) {
          return d.sourceIdx;
        })
        .attr("y1", function(d) {
          return d.sourceIdy;
        })
        .attr("x2", function(d) {
          return d.targetIdx;
        })
        .attr("y2", function(d) {
          return d.targetIdy;
        });

      var nodeUpdate = nodeEnter.merge(helperNode);
      nodeUpdate
        .transition()
        .duration(1000)
        .attr("id", function(d) {
          return d.nodeId;
        })
        .attr("r", 10)
        .attr("opacity", 1.0)
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      // EXIT Section
      var edgeExit = helperEdge
        .exit()
        .transition()
        .duration(1000)
        .remove();
      var nodeExit = helperNode
        .exit()
        .transition()
        .duration(1000)
        .remove();
    }
  }
};
</script> 

<style>
</style>
