import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuew.store({
    state: {
        edges: [],
        nodes: [],
        weights: [],
        metrics: [],
        timestamps: [],
        toggleMap: [        { visible: true, "h0": 11, h: 75, id: 0, view: "network-view" },
        { visible: true, "h0": 11, h: 50, id: 1, view: "metric-view" },
        { visible: true, "h0": 11, h: 58, id: 2, view: "context-feature-model" },
        { visible: true, "h0": 11, h: 50, id: 3, view: "state-view" },
        { visible: true, "h0": 11, h: 23, id: 4, view: "performance-view" }],
        cfm_new: {
          "fm": {
            "root": {
              "binaryCardinals": "NO_DOT",
              "children": [
                {
                  "binaryCardinals": "NO_DOT",
                  "children": [
                    {
                      "binaryCardinals": "NO_DOT",
                      "children": [],
                      "attributes": [
                        {
                          "domain": {
                            "domainType": "REAL",
                            "lowerBoundary": 0,
                            "upperBoundary": 20
                          },
                          "value": 0,
                          "name": "weightOptimizationThreshold",
                          "system": false,
                          "currentlyChosen": false
                        }
                      ],
                      "featureInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupInstanceCardinality": {
                        "lb": 1,
                        "ub": -1
                      },
                      "groupTypeCardinality": {
                        "lb": 1,
                        "ub": -1
                      },
                      "name": "fsWOpt",
                      "system": true,
                      "currentlyChosen": false
                    },
                    {
                      "binaryCardinals": "NO_DOT",
                      "children": [
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "name": "fsMAXPOWERTC",
                          "system": true,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [
                            {
                              "domain": {
                                "domainType": "REAL",
                                "lowerBoundary": 1,
                                "upperBoundary": 2
                              },
                              "value": 0,
                              "name": "parameterKtcK",
                              "system": false,
                              "currentlyChosen": false
                            }
                          ],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "groupInstanceCardinality": {
                            "lb": 1,
                            "ub": -1
                          },
                          "groupTypeCardinality": {
                            "lb": 1,
                            "ub": -1
                          },
                          "name": "fsDKTC",
                          "system": true,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [
                            {
                              "domain": {
                                "domainType": "REAL",
                                "lowerBoundary": 1,
                                "upperBoundary": 2
                              },
                              "value": 0,
                              "name": "parameterEKtcK",
                              "system": false,
                              "currentlyChosen": false
                            }
                          ],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "groupInstanceCardinality": {
                            "lb": 1,
                            "ub": -1
                          },
                          "groupTypeCardinality": {
                            "lb": 1,
                            "ub": -1
                          },
                          "name": "fsEKTC",
                          "system": true,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [
                            {
                              "domain": {
                                "domainType": "REAL",
                                "lowerBoundary": 1,
                                "upperBoundary": 2
                              },
                              "value": 0,
                              "name": "parameterLStarKtcK",
                              "system": false,
                              "currentlyChosen": false
                            },
                            {
                              "domain": {
                                "domainType": "REAL",
                                "lowerBoundary": 1,
                                "upperBoundary": 2
                              },
                              "value": 0,
                              "name": "parameterLStarKtcA",
                              "system": false,
                              "currentlyChosen": false
                            }
                          ],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "groupInstanceCardinality": {
                            "lb": 1,
                            "ub": -1
                          },
                          "groupTypeCardinality": {
                            "lb": 1,
                            "ub": -1
                          },
                          "name": "fsLSTARKTC",
                          "system": true,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "name": "fsLMST",
                          "system": true,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "name": "fsGMST",
                          "system": true,
                          "currentlyChosen": false
                        }
                      ],
                      "attributes": [
                        {
                          "domain": {
                            "domainType": "INTEGER",
                            "lowerBoundary": 1,
                            "upperBoundary": 20
                          },
                          "value": 0,
                          "name": "fsTCint",
                          "system": true,
                          "currentlyChosen": false
                        }
                      ],
                      "featureInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupTypeCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "name": "fsTCAlgo",
                      "system": true,
                      "currentlyChosen": false
                    }
                  ],
                  "attributes": [],
                  "featureInstanceCardinality": {
                    "lb": 1,
                    "ub": 1
                  },
                  "groupInstanceCardinality": {
                    "lb": 1,
                    "ub": -1
                  },
                  "groupTypeCardinality": {
                    "lb": 1,
                    "ub": -1
                  },
                  "name": "fsSystem",
                  "system": true,
                  "currentlyChosen": false
                },
                {
                  "binaryCardinals": "NO_DOT",
                  "children": [
                    {
                      "binaryCardinals": "NO_DOT",
                      "children": [],
                      "attributes": [
                        {
                          "domain": {
                            "domainType": "REAL",
                            "lowerBoundary": 0,
                            "upperBoundary": 5
                          },
                          "value": 0,
                          "name": "mobilitySpeed",
                          "system": false,
                          "currentlyChosen": false
                        }
                      ],
                      "featureInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupInstanceCardinality": {
                        "lb": 1,
                        "ub": -1
                      },
                      "groupTypeCardinality": {
                        "lb": 1,
                        "ub": -1
                      },
                      "name": "fcMobSpeed",
                      "system": false,
                      "currentlyChosen": false
                    },
                    {
                      "binaryCardinals": "NO_DOT",
                      "children": [
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "name": "fcPOINTTOPOINT",
                          "system": false,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "name": "fcGOSSIP",
                          "system": false,
                          "currentlyChosen": false
                        },
                        {
                          "binaryCardinals": "NO_DOT",
                          "children": [],
                          "attributes": [],
                          "featureInstanceCardinality": {
                            "lb": 0,
                            "ub": 1
                          },
                          "name": "fcDATACOLLECTION",
                          "system": false,
                          "currentlyChosen": false
                        }
                      ],
                      "attributes": [],
                      "featureInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupTypeCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "name": "fcScenario",
                      "system": false,
                      "currentlyChosen": false
                    },
                    {
                      "binaryCardinals": "NO_DOT",
                      "children": [],
                      "attributes": [
                        {
                          "domain": {
                            "domainType": "REAL",
                            "lowerBoundary": 0,
                            "upperBoundary": 500
                          },
                          "value": 0,
                          "name": "topologyDensity",
                          "system": false,
                          "currentlyChosen": false
                        },
                        {
                          "domain": {
                            "domainType": "INTEGER",
                            "lowerBoundary": 0,
                            "upperBoundary": 1000
                          },
                          "value": 0,
                          "name": "nodeCount",
                          "system": false,
                          "currentlyChosen": false
                        },
                        {
                          "domain": {
                            "domainType": "INTEGER",
                            "lowerBoundary": 0,
                            "upperBoundary": 1000000
                          },
                          "value": 0,
                          "name": "edgeCount",
                          "system": false,
                          "currentlyChosen": false
                        },
                        {
                          "domain": {
                            "domainType": "INTEGER",
                            "lowerBoundary": 0,
                            "upperBoundary": 5000
                          },
                          "value": 0,
                          "name": "worldSize",
                          "system": false,
                          "currentlyChosen": false
                        }
                      ],
                      "featureInstanceCardinality": {
                        "lb": 1,
                        "ub": 1
                      },
                      "groupInstanceCardinality": {
                        "lb": 1,
                        "ub": -1
                      },
                      "groupTypeCardinality": {
                        "lb": 1,
                        "ub": -1
                      },
                      "name": "fcTopology",
                      "system": false,
                      "currentlyChosen": false
                    }
                  ],
                  "attributes": [],
                  "featureInstanceCardinality": {
                    "lb": 1,
                    "ub": 1
                  },
                  "groupInstanceCardinality": {
                    "lb": 1,
                    "ub": -1
                  },
                  "groupTypeCardinality": {
                    "lb": 1,
                    "ub": -1
                  },
                  "name": "fcContext",
                  "system": false,
                  "currentlyChosen": false
                }
              ],
              "attributes": [],
              "featureInstanceCardinality": {
                "lb": 1,
                "ub": 1
              },
              "groupInstanceCardinality": {
                "lb": 1,
                "ub": -1
              },
              "groupTypeCardinality": {
                "lb": 1,
                "ub": -1
              },
              "name": "root",
              "system": false,
              "currentlyChosen": false
            }
          },
          "type": "fm"
        },
        cfm: [
          {
            child: "Tasklet System",
            parent: "",
            type: "root",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "1,*",
            cardinalityConnector: ""
          },
          {
            child: "System",
            parent: "Tasklet System",
            type: "systemFeature",
            Required: "Mandatory",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Context",
            parent: "Tasklet System",
            type: "contextFeature",
            Required: "Mandatory",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Provider Scheduling",
            parent: "System",
            type: "systemFeature",
            Required: "Mandatory",
            hasAlternatives: true,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "1,1",
            cardinalityConnector: ""
          },
          {
            child: "Pattern Recognition",
            parent: "System",
            type: "systemFeature",
            Required: "Optional",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "RoundRobin",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "AlwaysBest",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Fuzzy",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Random",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "lowThreshold",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "10..40",
            Value: 32,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "highThreshold",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "60..90",
            Value: 66,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "percentageSlowProviders",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "25..50",
            Value: 26,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "percentageFastProviders",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "25..50",
            Value: 25,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "#Providers",
            parent: "Context",
            type: "contextAttribute",
            Required: "",
            hasAlternatives: false,
            int: "0..250",
            Value: 110,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "#Consumers",
            parent: "Context",
            type: "contextAttribute",
            Required: "",
            hasAlternatives: false,
            int: "0..25",
            Value: 13,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Average Utilization",
            parent: "Context",
            type: "contextAttribute",
            Required: "",
            hasAlternatives: false,
            int: "0..1",
            Value: 0.32,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          }
        ],
        cfm2: [
          {
            child: "WSN",
            parent: "",
            type: "root",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "1,*",
            cardinalityConnector: ""
          },
          {
            child: "System",
            parent: "WSN",
            type: "systemFeature",
            Required: "Mandatory",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Context",
            parent: "WSN",
            type: "contextFeature",
            Required: "Mandatory",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "New feature 1",
            parent: "System",
            type: "systemFeature",
            Required: "Mandatory",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "1,1",
            cardinalityConnector: ""
          },
          {
            child: "New feature 2",
            parent: "System",
            type: "systemFeature",
            Required: "Mandatory",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "1,1",
            cardinalityConnector: ""
          },
          {
            child: "Provider Scheduling",
            parent: "System",
            type: "systemFeature",
            Required: "Mandatory",
            hasAlternatives: true,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "1,1",
            cardinalityBottom: "",
            cardinalityAlternative: "1,1",
            cardinalityConnector: ""
          },
          {
            child: "Pattern Recognition",
            parent: "System",
            type: "systemFeature",
            Required: "Optional",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Sub 1",
            parent: "New feature 1",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Sub 2",
            parent: "New feature 1",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Sub 3",
            parent: "New feature 1",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "RoundRobin",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "AlwaysBest",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "Active",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Fuzzy",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Random",
            parent: "Provider Scheduling",
            type: "systemFeature",
            Required: "",
            hasAlternatives: false,
            int: "",
            Value: "",
            status: "",
            cardinalityTop: "0,1",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "lowThreshold",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "10..40",
            Value: 32,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "highThreshold",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "60..90",
            Value: 66,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "percentageSlowProviders",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "25..50",
            Value: 26,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "percentageFastProviders",
            parent: "Fuzzy",
            type: "systemAttribute",
            Required: "",
            hasAlternatives: false,
            int: "25..50",
            Value: 25,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "#Providers",
            parent: "Context",
            type: "contextAttribute",
            Required: "",
            hasAlternatives: false,
            int: "0..250",
            Value: 110,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "#Consumers",
            parent: "Context",
            type: "contextAttribute",
            Required: "",
            hasAlternatives: false,
            int: "0..25",
            Value: 13,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          },
          {
            child: "Average Utilization",
            parent: "Context",
            type: "contextAttribute",
            Required: "",
            hasAlternatives: false,
            int: "0..1",
            Value: 0.32,
            status: "",
            cardinalityTop: "",
            cardinalityBottom: "",
            cardinalityAlternative: "",
            cardinalityConnector: ""
          }
        ],
      },
      mutations: {
        updateNodes(state, payload) {
          state.nodes = payload;
        },
        updateEdges(state, payload) {
          state.edges = payload;
        },
        updateMetrics(state, payload) {
          state.metrics = payload;
        },
        updateTimestamps(state, payload) {
          state.timestamps = payload;
        },
        updateWeights(state, payload) {
          state.weights = payload;
        },
        updateCFM(state, payload) {
          state.cfm_new = payload;
        },
        updateToggle(state, payload) {
          state.toggleMap = payload;
        }
      }
});
