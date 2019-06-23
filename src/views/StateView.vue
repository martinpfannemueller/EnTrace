<template>
  <view-header :id="id" :element-name="name">
    <b-row>
      <b-col cols="10">
        <svg
          id="state-view"
          :height="height"
          :width="width"
          margin="auto"
        ></svg>
      </b-col>
      <b-col>
        <b-button
          size="sm"
          variant="primary"
          style="margin-bottom: 5px"
          @click="renderStateView(states, links)"
        >
          <font-awesome-icon icon="expand" />&nbsp;Center
        </b-button>
        <b-form-input
          v-model="circleDistance"
          size="sm"
          style="margin-bottom: 5px"
        ></b-form-input>
        <b-form-input v-model="circleRadius" size="sm"></b-form-input>
      </b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import * as d3 from "d3";
export default {
  components: {
    "view-header": ViewHeader
  },
  data() {
    return {
      name: "State View",
      id: 3,
      width: 550,
      height: 239,
      circleRadius: 30,
      circleDistance: 150,
      stateViewSVG: "",
      statesSVG: "",
      linksSVG: "",
      animiationDuration: 1500,
      states: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ],
      links: [
        {
          id: 1,
          source: 1,
          target: 4,
          count: 3
        },
        {
          id: 2,
          source: 3,
          target: 2,
          count: 2
        },
        {
          id: 3,
          source: 1,
          target: 3,
          count: 1
        },
        {
          id: 3,
          source: 4,
          target: 4,
          count: 1
        }
      ]
    };
  },
  computed: {
    cfmValues() {
      return this.$store.state.cfmValues;
    },
    hoverColor() {
      return this.$store.state.hoverColor;
    }
  },
  watch: {
    circleDistance: function() {
      // this.renderStateView(this.states, this.links);
    },
    cfmValues: function(val) {
      if (val == "") {
        console.log("Error");
      } else {
        this.renderStateView(this.states, this.links);
      }
    }
  },
  mounted() {
    this.initializeSelector();
    this.renderStateView(this.states, this.links);
  },
  methods: {
    initializeSelector() {
      let cfmHelper = d3
        .selectAll("#state-view")
        .call(
          d3.zoom().on("zoom", function() {
            cfmHelper.attr("transform", d3.event.transform);
          })
        )
        .on("dblclick.zoom", null) // Prevent zoom on double click´
        .append("g")
        .attr("transform", "translate(-100, 0) scale(0.7)");
      this.stateViewSVG = cfmHelper;
      this.statesSVG = this.stateViewSVG.append("g");
      this.linksSVG = this.stateViewSVG.append("g");
      // Add arrow for link lines
      this.stateViewSVG
        .append("svg:defs")
        .append("svg:marker")
        .attr("id", "triangle")
        .attr("refX", 9)
        .attr("refY", 9)
        .attr("markerWidth", 40)
        .attr("markerHeight", 40)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 18 9 0 18 0 9")
        .style("fill", "black");
    },
    renderStateView(states, links) {
      let drawConnection = this.drawConnection;
      let circleDistance = this.circleDistance;
      let circleRadius = this.circleRadius;
      var state = this.statesSVG.selectAll("g.state").data(states, function(d) {
        return d.id;
      });
      var link = this.linksSVG.selectAll("path.link").data(links, function(d) {
        return d.id;
      });

      // ENTER SECTION
      var stateEnter = state
        .enter()
        .append("g")
        .attr("class", "state")
        .attr("transform", function(d) {
          return (
            "translate(" + d.id * circleDistance + "," + circleDistance + ")"
          );
        })
        .on("mouseover", this.mouseoverState)
        .on("mouseout", this.mouseoutState);

      // Add circle for each state
      stateEnter
        .append("circle")
        .attr("class", "stateCircle")
        .attr("fill", "transparent")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("r", this.circleRadius);

      // Add text for each state
      stateEnter
        .append("text")
        .attr("class", "textLabel")
        .attr("text-anchor", "middle")
        .attr("font-size", 20)
        .attr("dy", "0.35em")
        .text(function(d) {
          return d.id;
        });

      // UPDATE SECTION
      var stateUpdate = stateEnter.merge(state);
      // Transition to new node
      stateUpdate
        .transition()
        .duration(this.animiationDuration)
        .attr("transform", function(d) {
          return (
            "translate(" + d.id * circleDistance + "," + circleDistance + ")"
          );
        });

      stateUpdate.selectAll("circle").attr("r", this.circleRadius);

      // EXIT SECTION
      // Remove any exiting nodes
      var stateExit = state
        .exit()
        .transition()
        .duration(this.animiationDuration)
        .remove();

      // On exit reduce the circles
      stateExit.selectAll("circle").attr("r", 1e-6);

      // On exit reduce the text
      stateExit.selectAll("text").attr("font-size", 0);

      // add link for each connection
      var linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("fill", "transparent")
        .attr("marker-end", "url(#triangle)")
        .attr("stroke", "black");

      var linkUpdate = linkEnter.merge(link);
      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(this.animiationDuration)
        .attr("marker-end", "url(#triangle)")
        .attr("stroke", "black")
        .attr("stroke-width", function(d) {
          return d.count + 1;
        })
        .attr("d", function(d) {
          return drawConnection(d);
        });

      // add link text to each connection
      // let linkTextEnter = link
      //   .enter()
      //   .append("text")
      //   .attr("font-size", 20)
      //   .attr("fill", "black")
      //   .attr("x", function(d) {
      //     return (d.source + (d.target - d.source) / 2) * circleDistance;
      //   })
      //   .attr("y", function(d) {
      //     let distance = Math.abs((d.source - d.target) * circleDistance);
      //     if (d.source >= d.target) {
      //       return -50;
      //     } else {
      //       return -50;
      //     }
      //   })
      //   .text(function(d) {
      //     return d.count + "x";
      //   });
    },
    createStates() {},
    drawConnection(d) {
      let circleRadius = this.circleRadius;
      let circleDistance = this.circleDistance;
      let bottom = 1; // If 1, connection will be drawn on top, if 0, connection will be drawn at the bottom
      var self = false; // If true, connection will be drawn on the same node
      if (d.source > d.target) {
        bottom = -1;
      }
      if (d.source == d.target) {
        self = true;
      }
      let sourcex = d.source * circleDistance;
      let targetx = d.target * circleDistance;
      let distance = targetx - sourcex;

      if (!self) {
        return (
          "m" +
          sourcex +
          " " +
          (circleDistance - circleRadius * bottom * 1.0) +
          " q " +
          distance / 2 +
          " " +
          (-circleDistance * 0.45 * distance) / circleDistance +
          " " +
          distance * 0.975 +
          " 0"
        );
      } else {
        console.log(self + " und wir sind bei " + d.source + "+" + d.target);
        return (
          "m" +
          " " +
          (circleDistance * d.source - 5) +
          " " +
          (circleDistance + circleRadius) +
          " q" +
          -0.1 * circleDistance +
          " " +
          0.35 * circleDistance +
          " " +
          0.05 * circleDistance +
          " " +
          0.35 * circleDistance +
          " q" +
          " " +
          0.1 * circleDistance +
          " " +
          0 +
          " " +
          0.05 * circleDistance +
          " " +
          -0.35 * circleDistance
        );
      }
    },
    mouseoverState(d, i, n) {
      let defaultNodeColor = this.defaultNodeColor;
      let circleRadius = this.circleRadius;
      let strokeWidth = this.strokeWidth;
      let fontSize = this.fontSize;

      d3.select(n[i])
        .selectAll("circle")
        .transition()
        .duration(200)
        .attr("r", circleRadius * 1)
        .attr("stroke-width", 5)
        .attr("fill", this.hoverColor);

      // Change font color
      d3.select(n[i])
        .selectAll(".textLabel")
        .transition()
        .duration(200)
        .attr("font-size", 30)
        .attr("fill", "white");
    },
    mouseoutState(d, i, n) {
      let defaultNodeColor = this.defaultNodeColor;
      let circleRadius = this.circleRadius;
      let strokeWidth = this.strokeWidth;
      let fontSize = this.fontSize;

      d3.select(n[i])
        .selectAll("circle")
        .transition()
        .duration(200)
        .attr("r", circleRadius)
        .attr("stroke-width", 2)
        .attr("fill", "white");

      // Change font color
      d3.select(n[i])
        .selectAll(".textLabel")
        .transition()
        .duration(200)
        .attr("font-size", 20)
        .attr("fill", "black");
    }
  }
};
</script>

<style>
text {
  user-select: none;
}
</style>
