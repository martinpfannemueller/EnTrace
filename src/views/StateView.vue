<template>
  <view-header :id="id" :element-name="name">
    <b-row>
      <b-col cols="8">
        <svg id="state-view" :height="height" :width="width" margin="auto" />
        <b-row>
          <b-col class="ui-col">
            <b-button
              size="sm"
              variant="primary"
              @click="renderStateView(stateCollection, linkCollection)"
            >
              <font-awesome-icon icon="expand" />&nbsp;Center
            </b-button>
          </b-col>
          <b-col class="ui-col">
            <b-form-input v-model="circleDistance" size="sm"></b-form-input>
            <div style="margin-top: 0px" class="text-muted interface-text">
              Distance
            </div>
          </b-col>
          <b-col class="ui-col">
            <b-form-input v-model="circleRadius" size="sm"></b-form-input>
            <div style="margin-top: 0px" class="text-muted interface-text">
              Circle radius
            </div>
          </b-col>
          <b-col class="ui-col">
            <b-input-group size="sm">
              <b-form-input v-model="numberOfIntervals"></b-form-input>
              <b-input-group-append
                ><b-button
                  variant="outline-secondary"
                  @click="adjustIntervals()"
                  >Apply</b-button
                ></b-input-group-append
              >
            </b-input-group>
            <div style="margin-top: 0px" class="text-muted interface-text">
              Intervals
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4">
        <tooltip
          class="tooltip-state"
          :state-collection="stateCollection"
          :selected-state="selectedStateID"
          :selected-link="selectedLinkID"
          :link-count="selectedLinkCount"
          :new-state="newStateID"
          :old-state="oldStateID"
        ></tooltip>
      </b-col>
    </b-row>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import * as d3 from "d3";
import Tooltip from "../helper_components/TooltipState.vue";
export default {
  components: {
    "view-header": ViewHeader,
    tooltip: Tooltip
  },
  data() {
    return {
      name: "State View",
      id: 3,
      width: 550,
      height: 240,
      numberOfIntervals: 10,
      circleRadius: 30,
      circleDistance: 150,
      stateViewSVG: "",
      statesSVG: "",
      linksSVG: "",
      animiationDuration: 1500,
      adjustedCFMValues: [],
      cfmValuesHash: "",
      stateCollection: [],
      linkCollection: [],
      oldStateID: "",
      newStateID: "",
      selectedStateID: 1,
      selectedLinkID: "",
      selectedLinkCount: undefined
    };
  },
  computed: {
    cfmAttributeDomainList() {
      return this.$store.state.cfmAttributeDomainList;
    },
    cfmValues() {
      return this.$store.state.cfmValues;
    },
    hoverColor() {
      return this.$store.state.hoverColor;
    }
  },
  watch: {
    cfmValues: function(val) {
      if (val == "") {
        console.log("Error");
      } else {
        console.log("New CFM values in state view");
        // Compute the adjusted values based on the number of intervals variable
        this.adjustedCFMValues = this.adjustCFMValues(
          JSON.parse(JSON.stringify(this.cfmValues))
        );
        // Hash the adjusted states
        this.cfmValuesHash = this.hashStates(this.adjustedCFMValues);
        console.log(this.cfmValuesHash);
        // Based on the states, adjust the stateCollection and linkCollection
        this.createStates();
        this.renderStateView(this.stateCollection, this.linkCollection);
      }
    }
  },
  mounted() {
    this.initializeSelector();
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
        .attr("markerWidth", this.circleRadius)
        .attr("markerHeight", this.circleRadius)
        .attr("markerUnits", "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 18 9 0 18 0 9")
        .style("fill", "black");
    },
    renderStateView(states, links) {
      let drawConnection = this.drawConnection;
      let circleDistance = this.circleDistance;
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
        .attr("stroke", "black")
        .on("mouseover", this.mouseoverLink)
        .on("mouseout", this.mouseoutLink);

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
    },
    hashStates(d) {
      var inputString = JSON.stringify(d);
      var hash = 0,
        i,
        chr;
      if (inputString.length === 0) return hash;
      for (i = 0; i < inputString.length; i++) {
        chr = inputString.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    },
    adjustCFMValues(d) {
      let cfmAttributeDomainList = this.cfmAttributeDomainList;
      let numberOfIntervals = this.numberOfIntervals;
      let index;
      d.stringAttributes.forEach(function(d) {
        if (d.realValue || d.realValue === 0) {
          // console.log(cfmAttributeDomainList.findIndex(x => x.name === d.name));
          index = cfmAttributeDomainList.findIndex(x => x.name === d.name);
          // console.log(index);
          let lowerBoundary = cfmAttributeDomainList[index].lowerBoundary;
          let upperBoundary = cfmAttributeDomainList[index].upperBoundary;
          let intervalSize =
            (upperBoundary - lowerBoundary) / numberOfIntervals;
          // console.log("Lower boundary is: " + lowerBoundary);
          // console.log("Upper boundary is: " + upperBoundary);
          // console.log("Thus, the interval size is: " + intervalSize);
          // console.log("And finally, the real value is: " + d.realValue);
          let interval = (d.realValue - lowerBoundary) / intervalSize;
          // console.log(d.realValue - lowerBoundary);
          // console.log(interval);
          let result =
            "[" +
            intervalSize * interval +
            ", " +
            intervalSize * (interval + 1) +
            "]";
          d.interval = interval;
          console.log("This is the resulting interval: " + result);
          delete d.realValue;
        }
      });
      return d;
    },
    createStates() {
      // Check if new state or existing
      if (this.stateCollection.length === 0) {
        // Case of first state
        console.log("A new state collection is created");
        this.stateCollection.push({
          id: 1,
          hash: this.cfmValuesHash,
          state: this.cfmValues
        });
        // Set ID of current state
        this.newStateID = 1;
        // State collection already exists
      } else {
        // Set old stage ID to current (new) state ID (newStateID will be changed later)
        console.log("The state collection already exists");
        this.oldStateID = this.newStateID;
        let index = this.stateCollection.findIndex(
          x => x.hash === this.cfmValuesHash
        );
        console.log("The calculated index is: " + index);
        console.log("And the new hash is: " + this.cfmValuesHash);
        // Check if hash already exisits
        if (index === -1) {
          console.log("The new hash does not already exisit...");
          // Update state ID (is +1 for the maximum link lenght)
          this.newStateID = this.stateCollection.length + 1;
          // Hash does not exist, push new hash into array
          this.stateCollection.push({
            id: this.newStateID,
            hash: this.cfmValuesHash,
            state: this.cfmValues
          });
          // Update links
          this.linkCollection.push({
            source: this.oldStateID,
            target: this.newStateID,
            count: 1,
            id: this.oldStateID + "->" + this.newStateID
          });
        } else {
          console.log("The state (hash) already exisits");
          // hash already exists
          // Update state ID (we are in the same state, so new = old)
          this.newStateID = this.oldStateID;
          // Update links
          let index = this.linkCollection.findIndex(
            x => x.source === this.oldStateID && x.target === this.newStateID
          );
          if (index === undefined) {
            console.log("But it is a new connection");
            // Case when connection does not exist yet
            this.linkCollection.push({
              source: this.oldStateID,
              target: this.newStateID,
              count: 1,
              id: this.oldStateID.toString + "->" + this.newStateID.toString
            });
          } else {
            console.log("The old state is equal to thew new state");
            // Case when connection already exists
            this.linkCollection[index].count++;
          }
        }
      }
    },
    drawConnection(d) {
      let circleRadius = parseInt(this.circleRadius);
      let circleDistance = parseInt(this.circleDistance);
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
        let returnVariant =
          "m " +
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
          -0.35 * circleDistance;
        return returnVariant;
      }
    },
    mouseoverState(d, i, n) {
      let circleRadius = this.circleRadius;

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

      console.log(d);
      this.selectedStateID = d.id;
    },
    mouseoutState(d, i, n) {
      let circleRadius = this.circleRadius;

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
    },
    mouseoverLink(d, i, n) {
      d3.select(n[i])
        .transition()
        .duration(200)
        .attr("stroke", this.hoverColor)
        .attr("stroke-width", function(d) {
          return d.count + 3;
        });
      this.selectedLinkID = d.id;
      console.log(d.id);
      this.selectedLinkCount = d.count;
    },
    mouseoutLink(d, i, n) {
      d3.select(n[i])
        .transition()
        .duration(200)
        .attr("stroke", "black")
        .attr("stroke-width", function(d) {
          return d.count + 1;
        });
      this.selectedLinkID = "";
      this.selectedLinkCount = undefined;
    }
  }
};
</script>

<style>
.tooltip-state {
  /* position: absolute; */
  /* pointer-events: none; */
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 5px;
  font-size: 10px;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 3px;
  color: white;
  overflow-y: auto;
  height: 270px;
}

.important-text {
  color: lightblue;
  /* font-size: 11px; */
  font-weight: bold;
}

.ui-col {
  padding-right: 0px;
}

.state {
  cursor: pointer;
}
</style>
