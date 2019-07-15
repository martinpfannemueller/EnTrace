<template>
  <view-header :id="id" :element-name="name">
    <tooltip
      v-if="selectedNode != '' || selectedEdge != ''"
      v-show="showTooltips"
      class="tooltip-network"
      :selected-node="selectedNode"
      :x="x"
      :y="y"
      :selected-edge="selectedEdge"
      :edge-weight="edgeWeight"
      :edge-length="edgeLength"
      :source-node="sourceNode"
      :target-node="targetNode"
    ></tooltip>
    <svg id="network-view" :height="height" :width="width" margin="auto"></svg>
    <b-row>
      <b-col>
        <b-button size="sm" variant="outline-primary" @click="centerNetwork">
          <font-awesome-icon icon="expand" />&nbsp;Center
        </b-button>
      </b-col>
      <b-col>
        <b-form-checkbox v-model="showTooltips" class="interface-text" switch
          >Tooltips</b-form-checkbox
        >
      </b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import Tooltip from "../tooltips/TooltipNetworkView";
import * as d3 from "d3";
export default {
  components: {
    "view-header": ViewHeader,
    tooltip: Tooltip
  },
  data() {
    return {
      name: "Network View",
      networkViewSVG: "",
      nodesSVG: "",
      edgesSVG: "",
      tooltipDiv: "",
      id: 0,
      width: 650,
      height: 360,
      circleRadius: 15,
      strokeWidth: 2,
      fontSize: 14,
      maxY: 0,
      maxX: 0,
      animationDuration: 1000,
      showTooltips: true,
      defaultNodeColor: "rgb(226, 245, 255)",
      defaultEdgeColor: "rgb(211, 19, 12)",
      selectedNode: "",
      x: "",
      y: "",
      selectedEdge: "",
      edgeWeight: "",
      edgeLength: "",
      sourceNode: "",
      targetNode: "",
      i: 0
    };
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
    edges() {
      return this.$store.state.edges;
    },
    hoverColor() {
      return this.$store.state.hoverColor;
    }
  },
  watch: {
    nodes: function() {
      this.renderNetwork(this.nodes, this.edges);
    },
    edges: function() {
      this.renderNetwork(this.nodes, this.edges);
    },
    maxX: function() {
      this.centerNetwork();
    },
    maxY: function() {
      this.centerNetwork();
    }
  },
  mounted() {
    this.initializeSelector();
    // // Render the Network View if already available
    if (this.edges != "") {
      this.renderNetwork(this.nodes, this.edges);
    }
  },
  methods: {
    // Initializes the SVG handler variables for D3 as well as the tooltip
    initializeSelector() {
      let cfmHelper = d3
        .selectAll("#network-view")
        .call(
          d3.zoom().on("zoom", function() {
            cfmHelper.attr("transform", d3.event.transform);
          })
        )
        .on("dblclick.zoom", null) // Prevent zoom on double click
        .append("g")
        .attr("transform", "translate(10, 5)");
      this.networkViewSVG = cfmHelper;
      this.edgesSVG = this.networkViewSVG.append("g");
      this.nodesSVG = this.networkViewSVG.append("g");
      this.tooltipDiv = d3.select(".tooltip-network");
    },
    // Renders the network topology with nodes and edges, calls most of the other functions
    renderNetwork(nodes, edges) {
      console.time("Network View");
      // Create local variables for colors and radius
      let defaultNodeColor = this.defaultNodeColor;
      let defaultEdgeColor = this.defaultEdgeColor;
      let circleRadius = this.circleRadius;
      let fontSize = this.fontSize;

      this.determineSize(nodes);
      // ****************** NODES SECTION ***************************

      // Add IDs for each node (important, because otherwise move event do not work)
      var node = this.nodesSVG.selectAll("g.node").data(nodes, function(d) {
        return d.nodeId;
      });

      // ENTER SECTION
      // Enter any new nodes (every node is an element in the CFM hierarchy)
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          let newX = d.x;
          let newY = d.y;
          return "translate(" + newX + "," + newY + ")";
        })
        .on("mouseover", this.mouseoverNode)
        .on("mouseout", this.mouseoutNode);
      // .on("click", this.collapse);

      // Add circle for each node
      nodeEnter
        .append("circle")
        .attr("class", "nodeCircle")
        .attr("fill", function(d) {
          if (d.color != null) {
            return d.color;
          } else {
            return defaultNodeColor;
          }
        })
        .attr("stroke", "black")
        .attr("r", circleRadius);

      // Add text for each node
      nodeEnter
        .append("text")
        .attr("class", "textLabel")
        .attr("text-anchor", "middle")
        .attr("font-size", fontSize)
        .attr("dy", "0.35em")
        .text(function(d) {
          return d.nodeId;
        });

      // UPDATE SECTION
      var nodeUpdate = nodeEnter.merge(node);
      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(this.animationDuration)
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      nodeUpdate
        .selectAll("circle.nodeCircle")
        .attr("fill", function(d) {
          if (d.color != null) {
            return d.color;
          } else {
            return defaultNodeColor;
          }
        })
        // .attr("stroke", "black")
        // .attr("stroke-width", strokeWidth)
        .attr("r", circleRadius);

      nodeUpdate.selectAll("text.texLabel");

      // EXIT SECTION
      // Remove any exiting nodes
      var nodeExit = node
        .exit()
        .transition()
        .duration(this.animationDuration)
        .attr("r", 0)
        .remove();

      // On exit reduce the circles
      nodeExit.selectAll("circle").attr("r", 1e-6);

      // On exit reduce the text
      nodeExit.selectAll("text").attr("font-size", 0);

      // ****************** EDGES SECTION ***************************

      // Set IDs for each link
      var edge = this.edgesSVG.selectAll("line.link").data(edges, function(d) {
        return d.edgeId;
      });

      // ENTER SECTION
      // Enter any new links at the parent's previous position.
      var edgeEnter = edge
        .enter()
        .insert("line", "g")
        .attr("class", "link")
        .attr("stroke", function(d) {
          if (d.color != null) {
            return d.color;
          } else {
            return defaultEdgeColor;
          }
        })
        .attr("stroke-width", function(d) {
          return d.weight + 2;
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
        })
        .on("mouseover", this.mouseoverEdge) // Make it work
        .on("mouseout", this.mouseoutEdge); // Make it work

      // UPDATE SECTION
      // Merge links
      var edgeUpdate = edgeEnter.merge(edge);
      // Transition back to the parent element position
      edgeUpdate
        .transition()
        .duration(this.animationDuration)
        .attr("stroke", function(d) {
          if (d.color != null) {
            return d.color;
          } else {
            return defaultEdgeColor;
          }
        })
        .attr("stroke-width", function(d) {
          return d.weight + 2;
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

      // EXIT SECTION
      // eslint-disable-next-line no-unused-vars
      var edgeExit = edge
        .exit()
        .transition()
        .duration(this.animationDuration)
        .attr("x1", function(d) {
          return d.sourceIdx;
        })
        .attr("y1", function(d) {
          return d.sourceIdy;
        })
        .attr("x2", function(d) {
          return d.sourceIdx;
        })
        .attr("y2", function(d) {
          return d.sourceIdy;
        })
        .remove();
      console.timeEnd("Network View");
    },
    // Determines the x and y max size for the network which are used to center/zoom the network diagram
    determineSize(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let truncX = Math.trunc(nodes[i].x);
        let truncMaxX = Math.trunc(this.maxX);
        let truncY = Math.trunc(nodes[i].y);
        let truncMaxY = Math.trunc(this.maxY);
        if (truncX > truncMaxX) {
          this.maxX = truncX;
        }
        if (truncY > truncMaxY) {
          this.maxY = truncY;
        }
      }
    },
    // Centers the network diagram based on the maxX and maxY parameters
    centerNetwork() {
      let scale = 0.8;
      let width = this.width;
      if (this.maxX > this.width || this.maxY > this.height) {
        scale = Math.min(
          (this.width / this.maxX) * 0.99,
          (this.height / this.maxY) * 0.99
        );
      }
      this.networkViewSVG
        .transition()
        .duration(this.animationDuration)
        .attr(
          "transform",
          "translate(" + width / 4 + ",0) scale(" + scale * 0.975 + ")"
        );
    },
    // Manages the mouseover event for the node elements of the Network View
    mouseoverNode(d, i, n) {
      let circleRadius = this.circleRadius;
      let fontSize = this.fontSize;
      let scaleFactor = 1.5;

      // Change size & fill
      d3.select(n[i])
        .selectAll("circle")
        .transition()
        .duration(200)
        .attr("fill", this.hoverColor)
        // .attr("stroke-width", strokeWidth * scaleFactor)
        .attr("r", circleRadius * scaleFactor);

      // Change font color
      d3.select(n[i])
        .selectAll(".textLabel")
        .transition()
        .duration(200)
        .attr("font-size", fontSize * scaleFactor)
        .attr("fill", "white");

      this.setTooltipElementsNode(d);
      this.tooltipDiv.style("opacity", 1);
    },
    // Manages the mouseout event for the node elements of the Network View
    mouseoutNode(d, i, n) {
      let defaultNodeColor = this.defaultNodeColor;
      let circleRadius = this.circleRadius;
      let fontSize = this.fontSize;

      d3.select(n[i])
        .selectAll("circle")
        .transition()
        .duration(400)
        .attr("fill", function(d) {
          if (d.color != null) {
            return d.color;
          } else {
            return defaultNodeColor;
          }
        })
        // .attr("stroke-width", strokeWidth)
        .attr("r", circleRadius);

      // Change font color
      d3.select(n[i])
        .selectAll(".textLabel")
        .transition()
        .duration(400)
        .attr("font-size", fontSize)
        .attr("fill", "black");

      this.selectedNode = "";
      this.x = "";
      this.y = "";
    },
    // Manages the mouseover event for the edges of the Network View
    mouseoverEdge(d, i, n) {
      d3.select(n[i])
        .transition()
        .duration(50)
        .attr("stroke", this.hoverColor)
        .attr("stroke-width", function(d) {
          return d.weight + 5;
        });
      this.setTooltipElementsEdge(d);
      this.tooltipDiv.style("opacity", 1);
    },
    // Manages the mouseout event for the edges of the Network View
    mouseoutEdge(d, i, n) {
      let defaultEdgeColor = this.defaultEdgeColor;
      d3.select(n[i])
        .transition()
        .duration(400)
        .attr("stroke", function(d) {
          if (d.color != null) {
            return d.color;
          } else {
            return defaultEdgeColor;
          }
        })
        .attr("stroke-width", function(d) {
          return d.weight + 2;
        });

      this.tooltipDiv.style("opacity", 0);
      this.selectedEdge = "";
      this.edgeWeight = "";
      this.edgeLength = "";
      this.sourceNode = "";
      this.targetNode = "";
    },
    // Prepares the data of the selected node tooltip
    setTooltipElementsNode(d) {
      this.selectedNode = d.nodeId;
      this.x = Math.trunc(d.x);
      this.y = Math.trunc(d.y);
    },
    // Prepares the data of the selected edge tooltip
    setTooltipElementsEdge(d) {
      this.selectedEdge = d.edgeId;
      this.edgeWeight = d.weight;
      this.edgeLength = this.calculateEdgeLength(d);
      this.sourceNode = d.sourceId;
      this.targetNode = d.targetId;
    },
    // Calculates the length of a node based on the coordinates of the nodes it links
    calculateEdgeLength(d) {
      let a = d.targetIdx - d.sourceIdx;
      let b = d.targetIdy - d.sourceIdy;
      return Math.round(Math.sqrt(a * a + b * b));
    }
  }
};
</script>

<style>
.tooltip-network {
  position: absolute;
  pointer-events: none;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 5px;
  font-size: 14px;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 3px;
  color: white;
}
</style>
