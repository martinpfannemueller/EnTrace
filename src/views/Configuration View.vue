<template>
  <view-header :id="id" :element-name="name">
    <tooltip
      v-if="selectedElement != ''"
      v-show="showTooltips"
      class="tooltip-cfm"
      :selected-element="selectedElement"
      :element-value="elementValue"
      :element-range="elementRange"
      :feature-instance-cardinality="featureInstanceCardinality"
      :group-instance-cardinality="groupInstanceCardinality"
      :group-type-cardinality="groupTypeCardinality"
    ></tooltip>
    <b-modal
      ref="attributeModal"
      :title="'Fixate value for ' + modalElementName + '?'"
      size="sm"
      @ok="sendAttribute(modalElementName, modalAttributeValue)"
    >
      <b-input-group :prepend="modalAttributeDomain" size="sm">
        <b-form-input
          v-model.number="modalAttributeValue"
          :min="modalAttributeLowerBoundary"
          :max="modalAttributeUpperBoundary"
          type="number"
          :state="checkModalValue()"
          autofocus="true"
        ></b-form-input>
      </b-input-group>
      <span class="text-muted interface-text">
        Min: {{ modalAttributeLowerBoundary }}, Max:
        {{ modalAttributeUpperBoundary }}
      </span>
      <br />
      <span v-if="checkModalValue()">
        Send attribute <strong>{{ modalElementName }}</strong> with value
        <strong>{{ modalAttributeValue }}</strong> to the adaptation
        logic?</span
      >
      <span v-else
        >Please enter a value within the specified lower ({{
          modalAttributeLowerBoundary
        }}) and upper ({{ modalAttributeUpperBoundary }}) boundaries
      </span>
      <br />
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button @click="cancel()">
          Cancel
        </b-button>
        <b-button
          variant="primary"
          :disabled="!checkModalValue()"
          @click="ok()"
        >
          OK
        </b-button>
      </template>
    </b-modal>
    <b-modal
      ref="featureModal"
      :title="'Force select ' + modalElementName + '?'"
      size="sm"
      @ok="sendFeature(modalElementName)"
    >
      <span>
        Send feature <strong>{{ modalElementName }}</strong> to the adaptation
        logic for force selection?</span
      >
    </b-modal>
    <svg
      id="cfm-view"
      :width="treeWidth - 20"
      :height="treeHeight + 50"
      margin="auto"
    ></svg>
    <b-row>
      <b-col>
        <b-button
          size="sm"
          variant="outline-primary"
          @click="defaultCFMposition"
        >
          <font-awesome-icon icon="expand" />&nbsp;Center
        </b-button>
      </b-col>
      <b-col>
        <b-form-checkbox
          v-model="autoAdjustHeight"
          class="interface-text"
          switch
          >Auto height</b-form-checkbox
        >
      </b-col>
      <b-col>
        <b-form-checkbox v-model="showTooltips" class="interface-text" switch
          >Tooltips</b-form-checkbox
        >
      </b-col>
      <b-col>
        <b-form-checkbox
          v-model="showCardinalities"
          class="interface-text"
          switch
          >Cardinalities</b-form-checkbox
        >
      </b-col>
    </b-row>
    <b-modal ref="notConnectedModal" title="No message send" size="sm">
      <span>{{ this.$store.state.notConnectedErrorMessage }}</span>
      <template slot="modal-footer" slot-scope="{ ok }">
        <b-button variant="primary" @click="ok()">
          OK
        </b-button>
      </template>
    </b-modal>
  </view-header>
</template>

<script>
import ViewHeader from "../helper_components/ViewHeader";
import Tooltip from "../tooltips/TooltipConfigurationView";
import { sendMessage } from "../connector/mqtt-connector";
import * as d3 from "d3";
import { createNewEvent, store } from "../store/store";
import { mapMutations } from "vuex";
export default {
  components: {
    "view-header": ViewHeader,
    tooltip: Tooltip
  },
  data() {
    return {
      name: "Configuration View",
      id: 2,
      cfmViewSVG: "",
      tooltipDiv: "",
      tree: "",
      root: "",
      addedAttributes: [],
      treeWidth: 680,
      treeHeight: 250,
      rectWidth: 23,
      rectHeight: 11,
      circleRadius: 2.5,
      scaleFactor: 1,
      animationDuration: 400,
      autoAdjustHeight: true,
      showTooltips: true,
      showCardinalities: true,
      i: 0,
      selectedElement: "",
      elementValue: "",
      elementRange: "",
      featureInstanceCardinality: "",
      groupInstanceCardinality: "",
      groupTypeCardinality: "",
      modalElementName: "",
      modalAttributeValue: undefined,
      modalAttributeDomain: "",
      modalAttributeLowerBoundary: undefined,
      modalAttributeUpperBoundary: undefined
    };
  },
  computed: {
    cfm() {
      if (this.$store.state.cfm != "") {
        return this.$store.state.cfm.fm.root;
      } else return "";
    },
    cfmValues() {
      return this.$store.state.cfmValues;
    },
    hoverColor() {
      return this.$store.state.hoverColor;
    }
  },
  watch: {
    autoAdjustHeight: function() {
      this.renderCFM(this.root);
    },
    cfm: function(val) {
      if (val == "") {
        console.log("Error");
      } else {
        this.establishRoot();
        this.renderCFM(this.root);
      }
    },
    cfmValues: function(val) {
      if (val == "") {
        console.log("Error");
      } else {
        this.setCurrentlyChosenAndValues(this.root);
        this.renderCFM(this.root);
      }
    },
    showCardinalities: function() {
      this.renderCFM(this.root);
    },
    scaleFactor: function() {
      this.defaultCFMposition();
    }
  },
  mounted() {
    this.initializeSelector();

    // Initilaize the d3 tree
    this.tree = d3.tree().size([this.treeWidth, this.treeHeight]);

    // // Establish root
    if (this.cfm == "") {
      // console.log("Root not ready yet");
    } else {
      this.establishRoot();
    }

    // // Render the CFM if already available
    if (this.root != "") {
      this.renderCFM(this.root);
    }
  },
  methods: {
    // Imports the updateAttributeDomainList mutation function from the store
    ...mapMutations(["updateAttributeDomainList"]),
    // Initializes the SVG handler variables for D3 as well as the tooltip
    initializeSelector() {
      let cfmHelper = d3
        .selectAll("#cfm-view")
        .call(
          d3.zoom().on("zoom", function() {
            cfmHelper.attr("transform", d3.event.transform);
          })
        )
        .on("dblclick.zoom", null) // Prevent zoom on double click´
        .append("g")
        .attr("transform", "translate(-10, 20)");
      this.cfmViewSVG = cfmHelper;
      this.tooltipDiv = d3.select(".tooltip-cfm");
    },
    // Uses D3.hierarchy on the CFM input data to create a child-node hierarchy
    establishRoot() {
      let addedAttributes = this.addedAttributes;
      // Create the hierarchy with x and y coordinates for the CFM diagram
      this.root = d3.hierarchy(this.cfm, function(d) {
        // Add attributes to children in case they are both existent
        if (d.children && d.children.length > 0 && d.attributes.length >= 1) {
          d.attributes.forEach(function(attribute) {
            // Check whether attribute has already been added to the children array
            if (addedAttributes.includes(attribute.name) == false) {
              // Add attribute to children array so it is included in the CFM rendering
              d.children.push(attribute);
              // Add already added attribute to list of added Attributes to avoid further double adding
              addedAttributes.push(attribute.name);
            }
          });
        }
        if (d.children) {
          if (d.children.length == 0) {
            if (d.attributes.length >= 1) {
              // If only attributes are available, return them as child nodes
              return d.attributes;
            }
          }
        }
        return d.children;
      });
      this.root.x0 = this.treeHeight / 2;
      this.root.y0 = 0;
      this.addedAttributes = addedAttributes;
    },
    // Renders the CFM, calls most of the other functions, requires a root-hierarchy, inspired by http://bl.ocks.org/d3noob/8375092
    renderCFM(source) {
      console.time("Configuration View");
      // Load local variables as "this." does not work inside D3 node operations
      let i = this.i;
      // Scale factor uses power function to scale, based on the amounts of nodes (descendants)
      let scaleFactor = Math.min(
        Math.pow(30 / this.root.descendants().length, 0.6),
        2.75
      );
      this.scaleFactor = scaleFactor;
      let rectWidth = this.rectWidth * Math.sqrt(scaleFactor);
      let rectHeight = this.rectHeight;
      let circleRadius = this.circleRadius;
      let treeData = this.tree(this.root);
      let nodes = treeData.descendants();
      let links = treeData.descendants().slice(1);
      let colorNodes = this.colorNodes;
      let colorText = this.colorText;
      let setMainLabelFontSize = this.setMainLabelFontSize;
      let setMainLabel = this.setMainLabel;
      let setValueLabel = this.setValueLabel;
      let stringifyCardinality = this.stringifyCardinality;
      let toggleCardinalities = this.toggleCardinalities;
      let stringifyDomain = this.stringifyDomain;
      let createAttributeDomainList = this.createAttributeDomainList;
      let setModalMenu = this.setModalMenu;

      if (!this.autoAdjustHeight) {
        // Normalize for fixed-depth if auto adjust is off
        nodes.forEach(function(d) {
          d.y = d.depth * 60;
        });
      }

      // ****************** NODES SECTION ***************************

      // Add IDs for each node (important, because otherwise move event do not work)
      var node = this.cfmViewSVG.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });
      // ENTER SECTION
      // Enter any new nodes (every node is an element in the CFM hierarchy)
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function() {
          let newX = source.x0 - rectWidth / 2;
          let newY = source.y0 - rectHeight;
          return "translate(" + newX + "," + newY + ")";
        })
        .on("mouseover", this.mouseover)
        .on("mouseout", this.mouseout)
        .on("dblclick", this.select)
        .on("click", this.collapseElement)
        .on("contextmenu", function(d) {
          d3.event.preventDefault();
          setModalMenu(d);
        });

      // Add rectangle for GROUP INSTANCE cardinalites for the nodes (first, so it is in the background)
      nodeEnter
        .append("rect")
        .attr("class", "cardinality hideWhenCollapsed group-instance");

      // Add rectangle for FEATURE INSTANCE cardinalites for the nodes (first, so it is in the background)
      nodeEnter
        .append("rect")
        .attr("class", "cardinality hideWhenCollapsed feature-instance");

      // Add alternative circles for the nodes (also first, because this should behind every other element)
      nodeEnter
        .append("circle")
        .attr("class", "alternative")
        .attr("r", 0);

      // Add rectangles for MAIN NODES
      nodeEnter
        .append("rect")
        .attr("class", "node")
        .attr("fill", function(d) {
          return colorNodes(d);
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1 / scaleFactor)
        .attr("stroke-dasharray", function(d) {
          if (d.data.system) {
            return "0,0";
          } else {
            if (d.data.name == "root") {
              return "0,0";
            } else {
              if (d.parent && d.parent.data.system) {
                return "0,0";
              } else {
                return "0.75,0.75";
              }
            }
          }
        })
        .attr("rx", function(d) {
          if (!d.children && d.data.domain) {
            return 5;
          } else {
            return 1;
          }
        });

      // Add MAIN labels for the nodes
      nodeEnter
        .append("text")
        .attr("class", "mainLabel")
        .text(function(d) {
          return setMainLabel(d);
        });

      // Add DOMAIN labels for the nodes
      nodeEnter
        .append("text")
        .attr("class", "domainLabel")
        .text(function(d) {
          if (d.data.domain) {
            createAttributeDomainList(d.data); // Load into store for state view
            return stringifyDomain(d.data.domain);
          }
        });

      // Add VALUE labels for the nodes
      nodeEnter
        .append("text")
        .attr("class", "valueLabel")
        .text(function(d) {
          return setValueLabel(d);
        });

      // Add FEATURE INSTANCE cardinalites for the nodes
      nodeEnter
        .append("text")
        .attr("class", "cardinality feature-instance")
        .text(function(d) {
          return stringifyCardinality(d.data.featureInstanceCardinality);
        });

      // Add GROUP INSTANCE cardinalites for the nodes
      nodeEnter
        .append("text")
        .attr("class", "cardinality group-instance hideWhenCollapsed")
        .text(function(d) {
          return stringifyCardinality(d.data.groupInstanceCardinality);
        });

      // Add GROUP TYPE cardinalites for the nodes
      nodeEnter
        .append("text")
        .attr("class", "cardinality group-type hideWhenCollapsed")
        .text(function(d) {
          return stringifyCardinality(d.data.groupTypeCardinality);
        });

      // Set common attributes for cardinality text
      nodeEnter
        .selectAll(".cardinality")
        .attr("font-size", 4)
        .attr("opacity", function(d) {
          return toggleCardinalities(d);
        });

      // Add mandatory/optional circles for the nodes
      nodeEnter
        .append("circle")
        .attr("class", "dot")
        .attr("r", 0);

      // UPDATE SECTION
      var nodeUpdate = nodeEnter.merge(node);
      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(this.animationDuration)
        .attr("transform", function(d) {
          let newX = d.x - rectWidth / 2 - (rectWidth / 2) * (scaleFactor - 1);
          let newY = d.y - rectHeight;
          return (
            "translate(" +
            newX +
            "," +
            newY +
            ") scale(" +
            scaleFactor +
            "," +
            scaleFactor +
            ")"
          );
        });

      // Update circle for alternatives
      nodeUpdate
        .select("circle.alternative")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("opacity", function(d) {
          if (d.data.hasAlternatives) {
            if (d._children) {
              return 0;
            } else {
              return 1;
            }
          } else {
            return 0;
          }
        })
        .attr("cx", rectWidth / 2)
        .attr("cy", rectHeight)
        .attr("r", circleRadius * 3.5);

      // Update circle for mandatory/optional
      nodeUpdate
        .select("circle.dot")
        .attr("r", circleRadius)
        .attr("opacity", function(d) {
          if (
            d.data.binaryCardinals == "FILLED_DOT" ||
            d.data.binaryCardinals == "EMPTY_DOT"
          ) {
            return 1;
          } else {
            return 0;
          }
        })
        .attr("fill", function(d) {
          if (d.data.binaryCardinals == "FILLED_DOT") {
            return "black";
          }
          if (d.data.binaryCardinals == "EMPTY_DOT") {
            return "white";
          }
        })
        .attr("stroke", "black")
        .attr("cx", rectWidth / 2);

      // Update rectangles for MAIN NODES
      nodeUpdate
        .select("rect.node")
        .attr("fill", function(d) {
          return colorNodes(d);
        })
        .attr("stroke-width", 1 / scaleFactor)
        .attr("width", rectWidth)
        .attr("height", rectHeight);

      // Update MAIN LABELS
      nodeUpdate
        .selectAll("text.mainLabel")
        .attr("font-size", function(d) {
          return setMainLabelFontSize(d);
        })
        .attr("text-anchor", "middle")
        .attr("fill", function(d) {
          return colorText(d);
        })
        .attr("dx", rectWidth / 2)
        .attr("dy", rectHeight / 1.6)
        .text(function(d) {
          return setMainLabel(d);
        });

      // Update VALUE LABELS
      nodeUpdate
        .selectAll("text.valueLabel")
        .attr("font-size", 4)
        .attr("text-anchor", "middle")
        .attr("dx", rectWidth / 2)
        .attr("dy", rectHeight * 1.75)
        .text(function(d) {
          return setValueLabel(d);
        });

      // Update DOMAIN LABELS
      nodeUpdate
        .selectAll("text.domainLabel")
        .attr("font-size", 4)
        .attr("text-anchor", "middle")
        .attr("dx", rectWidth / 2)
        .attr("dy", rectHeight * 1.4);

      // Update rectanlge for FEATURE INSTANCE CARDINALITIES
      nodeUpdate
        .selectAll("rect.feature-instance")
        .attr("width", function(d) {
          if (d.data.featureInstanceCardinality) {
            return 10;
          } else return 0;
        })
        .attr("height", 5)
        .attr("fill", "white")
        .attr("x", 0)
        .attr("y", -5);

      // Update position of FEATURE INSTANCE CARDINALITIES
      nodeUpdate
        .selectAll(".feature-instance")
        .attr("text-anchor", "left")
        .attr("dx", 0)
        .attr("dy", -rectHeight / 7);

      // Update rectanlge for GROUP INSTANCE CARDINALITIES
      nodeUpdate
        .selectAll("rect.group-instance")
        .attr("width", function(d) {
          if (d.data.groupInstanceCardinality) {
            return rectWidth / 2;
          } else return 0;
        })
        .attr("height", 5)
        .attr("fill", "white")
        .attr("x", rectWidth / 4)
        .attr("y", rectHeight);

      // Update position of GROUP INSTANCE CARDINALITIES
      nodeUpdate
        .selectAll(".group-instance")
        .attr("text-anchor", "middle")
        .attr("dx", rectWidth / 2)
        .attr("dy", rectHeight * 1.4);

      // Update position of GROUP TYPE CARDINALITIES
      nodeUpdate
        .selectAll(".group-type")
        .attr("text-anchor", "right")
        .attr("dx", rectWidth / 1.2)
        .attr("dy", rectHeight * 1.4);

      // Update cardinilaties (if children are collapsed)
      nodeUpdate
        .selectAll("text.hideWhenCollapsed")
        .attr("opacity", function(d) {
          if (d._children) {
            return 0;
          } else {
            return 1;
          }
        });

      // Hide cardinalities if option to hide them is specified
      nodeUpdate.selectAll(".cardinality").attr("opacity", function(d) {
        return toggleCardinalities(d);
      });

      // EXIT SECTION
      // Remove any exiting nodes
      var nodeExit = node
        .exit()
        .transition()
        .duration(this.animationDuration)
        .attr("transform", function() {
          return "translate(" + source.x + "," + source.y + ")";
        })
        .remove();

      // On exit reduce the rectangles
      nodeExit
        .selectAll("rect")
        .attr("width", 1e-6)
        .attr("height", 1e-6);

      // On exit reduce the circles
      nodeExit.selectAll("circle").attr("r", 1e-6);

      // On exit reduce the text
      nodeExit.selectAll("text").attr("font-size", 0);

      // ****************** LINKS SECTION ***************************
      // Set IDs for each link
      var link = this.cfmViewSVG
        .selectAll("line.link")
        .data(links, function(d) {
          return d.id;
        });
      // ENTER SECTION
      // Enter any new links at the parent's previous position.
      var linkEnter = link
        .enter()
        .insert("line", "g")
        .attr("class", "link")
        .attr("stroke", "darkgrey")
        .attr("x1", source.x0)
        .attr("y1", source.y0)
        .attr("x2", source.x0)
        .attr("y2", source.y0);

      // UPDATE SECTION
      // Merge links
      var linkUpdate = linkEnter.merge(link);
      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(this.animationDuration)
        .attr("x1", function(d) {
          return d.x;
        })
        .attr("y1", function(d) {
          return d.y - rectHeight;
        })
        .attr("x2", function(d) {
          return d.parent.x;
        })
        .attr("y2", function(d) {
          return d.parent.y + rectHeight * (scaleFactor - 1);
        });

      // EXIT SECTION
      // eslint-disable-next-line no-unused-vars
      var linkExit = link
        .exit()
        .transition()
        .duration(this.animationDuration)
        .attr("x1", source.x)
        .attr("y1", source.y)
        .attr("x2", source.x)
        .attr("y2", source.y)
        .remove();

      // OTHER OPERATIONS
      // Store new positions of each node
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
      console.timeEnd("Configuration View");
    },
    // Sets the appropriate color for an element/node in the CFM
    colorNodes(d) {
      if (d.data.currentlyChosen) {
        if (d._children) {
          return "rgb(13, 80, 107)";
        } else {
          return "rgb(100, 100, 100)";
        }
      } else {
        if (d._children) {
          return "rgb(226, 245, 255)";
        } else {
          return "rgb(247, 247, 247)";
        }
      }
    },
    // Sets the appropriate color for the text of an element in the CFM
    colorText(d) {
      if (d.data.currentlyChosen) {
        return "white";
      } else {
        return "black";
      }
    },
    // Sets the font size of the main label based on the length of the name of an element
    setMainLabelFontSize(d) {
      if (d.data.name.length >= 10) {
        return 4.5;
      } else return 4.75;
    },
    // Sets the text for the main label, trunctuates based on the style factor and upper case characters
    setMainLabel(d) {
      let scaleFactor = this.scaleFactor;
      if (scaleFactor > 1.6) {
        if (d.data.name.length > 14) {
          return (
            d.data.name.substring(0, Math.round(9 * Math.sqrt(scaleFactor))) +
            "..."
          );
        } else return d.data.name;
      } else {
        if (d.data.name.length > 9) {
          let upperCount = d.data.name.replace(/[^A-Z]/g, "").length;
          if (upperCount > 5) {
            return (
              d.data.name.substring(0, Math.round(7 * Math.sqrt(scaleFactor))) +
              "..."
            );
          } else {
            return (
              d.data.name.substring(0, Math.round(8 * Math.sqrt(scaleFactor))) +
              "..."
            );
          }
        } else {
          let upperCount = d.data.name.replace(/[^A-Z]/g, "").length;
          if (upperCount > 5) {
            return (
              d.data.name.substring(0, Math.round(6 * scaleFactor)) + "..."
            );
          }
        }
        return d.data.name;
      }
    },
    // Creates the label for the value of an element
    setValueLabel(d) {
      if (d.data.value != undefined) {
        return "Value: " + d.data.value;
      }
    },
    // Sets the Boolean property of the currently chosen elements as well as their values based on the cfmValues input
    setCurrentlyChosenAndValues(d) {
      let descendants = d.descendants();
      let cfmValues = this.cfmValues;
      descendants.forEach(function(d) {
        let node = d.data;
        // Set currently chosen for features
        cfmValues.stringFeatures.forEach(function(d) {
          if (node.name == d.name) {
            node.currentlyChosen = true;
          }
        });
        cfmValues.stringAttributes.forEach(function(d) {
          if (node.name == d.name) {
            // Set currently chosen for attributes
            node.currentlyChosen = true;
            // Set values for attributes
            let value = "";
            if (d.intValue) {
              value = d.intValue;
            } else if (d.realValue || d.realValue === 0) {
              value = d.realValue;
            }
            node.value = value;
          }
        });
      });
    },
    // Creates a string in the appropriate format for the cardinalities
    stringifyCardinality(d) {
      if (d) {
        return "<" + d.lb + "," + d.ub + ">";
      } else return "";
    },
    // Creates a string in the appropriate format for the domains
    stringifyDomain(d) {
      return d.domainType + ": " + d.lowerBoundary + "..." + d.upperBoundary;
    },
    // Creates the attribute domain list used for the State View
    createAttributeDomainList(d) {
      let newAttribute = {
        name: d.name,
        domainType: d.domain.domainType,
        lowerBoundary: d.domain.lowerBoundary,
        upperBoundary: d.domain.upperBoundary
      };
      store.commit("updateAttributeDomainList", newAttribute);
    },
    // Prepares the data of the selected element for the tooltip
    setTooltipElements(d) {
      // Name and value
      this.selectedElement = "Element: " + d.data.name;
      if (d.data.value != null) {
        this.elementValue = "Value: " + d.data.value;
      } else {
        this.elementValue = "";
      }

      // Domain
      if (d.data.domain) {
        this.elementRange = "Domain: " + this.stringifyDomain(d.data.domain);
      } else {
        this.elementRange = "";
      }

      // Cardinalities
      if (d.data.featureInstanceCardinality) {
        this.featureInstanceCardinality =
          "Feature instance cardinality: " +
          this.stringifyCardinality(d.data.featureInstanceCardinality);
      } else {
        this.featureInstanceCardinality = "";
      }

      if (d.data.groupInstanceCardinality) {
        this.groupInstanceCardinality =
          "Group instance cardinality: " +
          this.stringifyCardinality(d.data.groupInstanceCardinality);
      } else {
        this.groupInstanceCardinality = "";
      }

      if (d.data.groupTypeCardinality) {
        this.groupTypeCardinality =
          "Group type cardinality: " +
          this.stringifyCardinality(d.data.groupTypeCardinality);
      } else {
        this.groupTypeCardinality = "";
      }
    },
    // Turns the cardinalities in the redering of the CFM on and off
    toggleCardinalities() {
      if (this.showCardinalities) {
        return 1;
      } else return 0;
    },
    // Collapses the CFM after the clicked element, saves the children-info in shadow-variable d._children
    collapseElement(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      this.renderCFM(d);
    },
    // Manages the mouse-over event for the elements of the CFM
    mouseover(d, i, n) {
      // SECTION FOR THE NODE
      // Change color to highlight element
      d3.select(n[i])
        .selectAll("rect.node")
        .attr("fill", this.hoverColor)
        .attr("class", "selected");

      // Change font color
      d3.select(n[i])
        .selectAll("text.mainLabel")
        .attr("fill", "white");

      // TOOLTIP SECTION
      this.setTooltipElements(d);
    },
    // Manages the mouseout-event for the elements of the CFM
    mouseout(d, i, n) {
      let colorNodes = this.colorNodes;
      let colorText = this.colorText;

      // SECTION FOR THE NODE
      // Reset color of rectangle
      d3.select(n[i])
        .selectAll("rect.selected")
        .attr("class", "node")
        .attr("fill", function(d) {
          return colorNodes(d);
        });

      // Reset color of text
      d3.select(n[i])
        .selectAll("text.mainLabel")
        .attr("fill", function(d) {
          return colorText(d);
        });

      // TOOLTIP SECTION
      this.tooltipDiv.style("opacity", 0);
      this.selectedElement = "";
      this.elementValue = "";
      this.elementRange = "";
      this.featureInstanceCardinality = "";
      this.groupInstanceCardinality = "";
      this.groupTypeCardinality = "";
    },
    // Zooms the CFM out to be in the default position
    defaultCFMposition() {
      if (this.scaleFactor > 2) {
        this.cfmViewSVG
          .transition()
          .duration(this.animationDuration)
          .attr("transform", "translate(-10, 25) scale(0.9)");
      } else {
        this.cfmViewSVG
          .transition()
          .duration(this.animationDuration)
          .attr("transform", "translate(-10, 20) scale(1)");
      }
    },
    setModalMenu(d) {
      let openAttributeModalMenu = this.$refs["attributeModal"].show;
      let openFeatureModalMenu = this.$refs["featureModal"].show;
      if (!d.children && d.data.domain) {
        this.modalElementName = d.data.name;
        this.modalAttributeDomain = d.data.domain.domainType;
        this.modalAttributeValue = d.data.value;
        this.modalAttributeLowerBoundary = d.data.domain.lowerBoundary;
        this.modalAttributeUpperBoundary = d.data.domain.upperBoundary;
        openAttributeModalMenu();
      }
      if (d.data.system && !d.data.domain) {
        this.modalElementName = d.data.name;
        openFeatureModalMenu();
      }
    },
    // Checks whether the input value for the selected attribute is within the lower and upper threshold domain range
    // Does not check integer vs real
    checkModalValue() {
      return this.modalAttributeValue >= this.modalAttributeLowerBoundary &&
        this.modalAttributeValue <= this.modalAttributeUpperBoundary
        ? true
        : false;
    },
    // Allows sending the attributes and specified weights to the adaptation logic, triggers the appropriate event
    sendAttribute(attribute, value) {
      try {
        let message = {
          content: {
            attribute: attribute,
            value: value
          },
          type: "send-attribute"
        };
        sendMessage(message, this.$store.state.senderChannel);
        createNewEvent(
          "Configuration View",
          "Attribute sent",
          "The attribute '" +
            attribute +
            "' with a value of " +
            value +
            " has been sent to the adaptation logic",
          false
        );
      } catch (e) {
        this.$refs["notConnectedModal"].show();
      }
    },
    // Allows sending the feature selected to the adaptation logic, triggers the appropriate event
    sendFeature(feature) {
      let message = {
        content: {
          feature: feature
        },
        type: "send-feature"
      };
      try {
        sendMessage(message, this.$store.state.senderChannel);
        createNewEvent(
          "Configuration View",
          "Feature sent",
          "The feature '" +
            feature +
            " has been sent to the adaptation logic for force adaptation",
          false
        );
      } catch (e) {
        this.$refs["notConnectedModal"].show();
      }
    }
  }
};
</script>

<style>
.tooltip-cfm {
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

.node {
  cursor: pointer;
}
</style>
