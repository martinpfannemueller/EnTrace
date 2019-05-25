<template>
  <view-header :elementName="name">
    <svg id="cfm-view" :width="treeWidth" :height="treeHeight + 30" margin="auto"></svg>
    <b-button size="sm" variant="primary" @click="defaultCFMposition">Reset size</b-button>
    <b-button size="sm" variant="primary" @click="loadOtherCFM">Load other CFM</b-button>
  </view-header>
</template>

<script>
import ViewHeader from "./ViewHeader.vue";
import * as d3 from "d3";
export default {
  components: {
    "view-header": ViewHeader
  },
  props: ["cfmInput", "cfmInput2"],
  data() {
    return {
      name: "Context Feature Model",
      treeWidth: 650,
      treeHeight: 180,
      treeDepth: 0,
      treeBreadth: 0,
      rectWidth: 70,
      rectHeight: 22,
      circleRadius: 3,
      animiationDuration: 1000,
      cfmTreeMap: "",
      cfmViewSVG: ""
    };
  },
  computed: {},
  mounted() {
    // Prepare data: Create hierachical tree structure from input data
    this.createTreeMap(this.cfmInput, this.treeWidth, this.treeHeight);

    // Prepare graphics: Initialize selector for cfmSVG
    this.initializeSelector();

    // Render CFM
    this.renderCFM(this.cfmTreeMap);
  },
  methods: {
    initializeSelector() {
      let cfmHelper = d3
        .selectAll("#cfm-view")
        .call(
          d3.zoom().on("zoom", function(d) {
            cfmHelper.attr("transform", d3.event.transform);
          })
        )
        .on("dblclick.zoom", null) // Prevent zoom on double click´
        .append("g")
        .attr("transform", "translate(-60, 5)");
      this.cfmViewSVG = cfmHelper;
    },
    renderCFM(treeMapInput) {
      console.log("Start to render the CFM ");
      var nodes = treeMapInput.descendants();
      var links = treeMapInput.descendants().slice(1);
      var connections = treeMapInput.links();
      let rectHeight = this.rectHeight;
      let rectWidth = this.rectWidth;
      let circleRadius = this.circleRadius;
      let cfmViewSVG = this.cfmViewSVG;

      // nodes.forEach(function(d) {
      //   d.y = d.depth * 35;
      // });

      var node = cfmViewSVG.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

      var link = cfmViewSVG.selectAll("line").data(connections, function(d) {
        return d.id;
      });

      // A - ENTER mode

      // Create links
      var linkEnter = link
        .enter()
        .append("line")
        .attr("class", "connectorLine")
        .attr("x1", function(d) {
          return d.source.x0;
        })
        .attr("y1", function(d) {
          return d.source.y0;
        })
        .attr("x2", function(d) {
          return d.target.x0;
        })
        .attr("y2", function(d) {
          return d.target.y0;
        });

      // Create nodes
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + treeMapInput.x0 + "," + treeMapInput.y0 + ")";
        })
        .on("click", this.collapse)
        .on("mouseover", this.mouseover)
        .on("mouseout", this.mouseout);

      // append CFM alternative circle elements
      nodeEnter
        .append("circle")
        .attr("class", "alternativeCircle")
        .attr("opacity", function(d, i) {
          if (d.data.hasAlternatives == true) {
            return 1.0;
          } else return 0;
        })
        .attr("cx", +rectWidth / 2)
        .attr("cy", +rectHeight * 0.875)
        .attr("fill", "white")
        .attr("r", this.circleRadius * 6);

      // append CFM elements
      nodeEnter
        .append("rect")
        .attr("class", "node")
        .attr("width", 1e-6)
        .attr("height", 1e-6);

      // append CFM text elements
      nodeEnter
        .append("text")
        .attr("dy", function() {
          return rectHeight / 1.7;
        })
        .attr("dx", function() {
          return rectWidth / 2;
        })
        .attr("class", "textLabel")
        .attr("font-size", function(d,i) {
            if (d.data.child.length > 14) {
              return 7;
            }
            else {
              return 10;
            }
        })
        .text(function(d) {
          return d.data.child;
        });

      // append CFM value text elements
      nodeEnter
        .append("text")
        .attr("class", "valueLabel")
        .text(function(d) {
          if (d.data.Value !== "") {
            return "Value: " + d.data.Value;
          }
        })
        .attr("dx", function() {
          return rectWidth / 2;
        })
        .attr("dy", function() {
          return rectHeight * 1.85;
        });

      // append int text elements
      nodeEnter
        .append("text")
        .attr("class", "intLabel")
        .text(function(d) {
          if (d.data.int !== "") {
            return "int: " + d.data.int;
          }
        })
        .attr("dx", function(d, i) {
          return rectWidth / 2;
        })
        .attr("dy", function(d) {
          return rectHeight * 1.45;
        });

      // append CFM mandatory/optional circle elements
      nodeEnter
        .append("circle")
        .attr("class", function(d) {
          if (d.data.Required == "Mandatory") {
            return "mandatoryCircle";
          }
          if (d.data.Required == "Optional") {
            return "optionalCircle";
          }
        })
        .attr("opacity", function(d, i) {
          if (d.data.Required !== "") {
            return 100;
          } else return 0;
        })
        .attr("cx", + rectWidth / 2)
        .attr("r", this.circleRadius);

      // append cardinality top
      nodeEnter
        .append("text")
        .attr("class", "cardinalityLabel")
        .attr("opacity", function(d, i) {
          if (d.data.cardinalityTop !== "") {
            return 100;
          } else return 0;
        })
        .text(function(d) {
          if (d.data.cardinalityTop !== "") {
            return "<" + d.data.cardinalityTop + ">";
          } else return "";
        })
        .attr("dx", function(d) {
          return rectWidth / 4;
        })
        .attr("dy", function(d) {
          return -rectHeight / 6.5;
        });

      // B - UPDATE mode
      var linkUpdate = linkEnter.merge(link);
      linkUpdate
        // .transition()
        // .duration(this.animiationDuration)
        .attr("x1", function(d) {
          return d.source.x + rectWidth / 2;
        })
        .attr("y1", function(d) {
          return d.source.y + rectHeight;
        })
        .attr("x2", function(d) {
          return d.target.x + rectWidth / 2;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      var nodeUpdate = nodeEnter.merge(node);
      nodeUpdate
        // .transition()
        // .duration(this.animiationDuration)
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      nodeUpdate
        .select("rect.node")
        .attr("class", function(d) {
          if (d.data.type == "systemFeature" && d.data.status == "Active") {
            return "node systemFeatureSelected";
          }
          if (d.data.type == "systemAttribute" && d.data.status == "Active") {
            return "node systemAttributeSelected";
          } else return "node" + " " + d.data.type;
        })
        .attr("width", function(d, i) {
          // console.log(d.data.child.length)
          if (d.data.child.length > 10) {
            return rectWidth * 1; // TODO: Fix correct lenght also at positioning
          } else {
          return rectWidth;
          }

        })
        .attr("height", function(d) {
          return rectHeight;
        });

      // Remove alternative circle when collapsed
      nodeUpdate
        .selectAll(".alternativeCircle")
        .attr("opacity", function(d, i) {
          if (d.data.hasAlternatives == true && d.children !== null) {
            return 1.0;
          } else return 0;
        })

      // C - EXIT mode
      var nodeExit = node
        .exit()
        // .transition()
        // .duration(this.animiationDuration)
        .attr("transform", function(d) {
          return "translate(" + treeMapInput.x + "," + treeMapInput.y + ")";
        })
        .remove();

      nodeExit
        .select("rect")
        .attr("width", 1e-6)
        .attr("height", 1e-6);

      nodeExit.select("text").attr("fill-opacity", 1e-6);

      nodeExit.select("circle").attr("r", 1e-6);

      var linkExit = link
        .exit()
        // .transition()
        // .duration(this.animiationDuration)
        .attr("x1", function(d) {
          return d.source.x + rectWidth / 2;
        })
        .attr("y1", function(d) {
          return d.source.y + rectHeight;
        })
        .attr("x2", function(d) {
          return d.source.x + rectWidth / 2;
        })
        .attr("y2", function(d) {
          return d.source.y + rectHeight;
        })
        .remove();

      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    },
    createTreeMap(inputData, width, height) {
      // Transforms input data into tree with height and weight
      let treeDataStructure = d3
        .stratify() // Transform data into tree structure
        .id(function(d) {
          return d.child;
        })
        .parentId(function(d) {
          return d.parent;
        })(inputData);
      let treeElement = d3.tree().size([width * 1.05, height * 0.875]); // Initialize tree
      this.cfmTreeMap = treeElement(treeDataStructure); // Return tree-formated variabel
      this.cfmTreeMap.x0 = this.treeHeight / 2;
      this.cfmTreeMap.y0 = 0 + this.rectHeight;
      this.treeDepth = 0;
    },
    collapse(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      this.renderCFM(this.cfmTreeMap);
      console.log(this.nodes);
    },
    mouseover(d, i, n) {
      // Make selection bigger
      d3.select(n[i]).attr("transform", function(d, i, n) {
        return (
          "translate(" + d.x / 1.005 + "," + d.y / 1.005 + ")" + "scale(1.1)"
        );
      });
      // Change color to highlight element
      d3.select(n[i])
        .selectAll("rect")
        .attr("class", function(d) {
          if (d.data.type == "systemFeature" && d.data.status == "Active") {
            return "selected systemFeatureSelected";
          }
          if (d.data.type == "systemAttribute" && d.data.status == "Active") {
            return "selected systemAttributeSelected";
          } else return "selected" + " " + d.data.type;
        });

      // Change font color
       d3.select(n[i])
        .selectAll(".textLabel")   
        .attr("fill", "white");

    },
    mouseout(d, i, n) {
      // Make selection size default again
      d3.select(n[i])
        .attr("opacity", 1.0)
        .attr("transform", function(d, i, n) {
          return "translate(" + d.x + "," + d.y + ")" + "scale(1)";
        });
      // Reset color
      d3.select(n[i])
        .selectAll("rect")
        .attr("class", function(d) {
          if (d.data.type == "systemFeature" && d.data.status == "Active") {
            return "node systemFeatureSelected";
          }
          if (d.data.type == "systemAttribute" && d.data.status == "Active") {
            return "node systemAttributeSelected";
          } else return "node" + " " + d.data.type;
        });

      // Change font color
      d3.select(n[i])
        .selectAll(".textLabel")   
        .attr("fill", "black");
    },
    defaultCFMposition() {
      this.cfmViewSVG
        .transition()
        .duration(this.animiationDuration)
        .attr("transform", "translate(-60,5) scale(1)");
    },
    loadOtherCFM() {
      this.createTreeMap(this.cfmInput2, this.treeWidth, this.treeHeight);
      this.renderCFM(this.cfmTreeMap);
    },
    moveToBack() {
      // return this.each(function() { 
      //       var firstChild = this.parentNode.firstChild; 
      //       if (firstChild) { 
      //           this.parentNode.insertBefore(this, firstChild); 
      //       } 
      //   });
    }
  }
};
</script>

<style>
.selected {
  fill: #4285f4 !important;
  stroke-width: 1.5 !important;
}

.node {
  cursor: pointer;
}

.connectorLine {
  stroke: black;
  stroke-width: 1;
}

.root {
  fill: darkgrey;
  stroke: black;
  rx: 1px;
}

.systemFeature {
  fill: rgb(244, 244, 244);
  stroke: black;
  rx: 1px;
}

.systemFeatureSelected {
  fill: darkgrey;
  stroke: black;
  rx: 1px;
}

.contextFeature {
  fill: darkgrey;
  stroke-dasharray: 2;
  stroke: black;
  rx: 1px;
}

.systemAttribute {
  fill: rgb(244, 244, 244);
  rx: 10;
  stroke: black;
}

.systemAttributeSelected {
  fill: darkgrey;
  rx: 10;
  stroke: black;
}

.contextAttribute {
  fill: darkgrey;
  stroke-dasharray: 2;
  stroke: black;
  rx: 10;
}

.alternativeCircle {
  fill: white;
  stroke: black;
}

.mandatoryCircle {
  fill: black;
  stroke: black;
}

.optionalCircle {
  fill: rgb(244, 244, 244);
  stroke: black;
}

.textLabel {
  text-anchor: middle;
}

.textLabelBold {
  text-anchor: middle;
  font-weight: 600;
  font-size: 10px;
  cursor: pointer;
  user-select: none;
}

.intLabel {
  text-anchor: middle;
  font-size: 10px;
    color: blue !important;
}

.valueLabel {
  text-anchor: middle;
  font-size: 10px;
}

.cardinalityLabel {
  text-anchor: middle;
  font-size: 10px;
}

#cfm-view {
  overflow: scroll;
}
</style>