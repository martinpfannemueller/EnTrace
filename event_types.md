# Event Types

## Topology View

### Channel: `add-node`
```json
{
	"nodeId":32,
	"x":10.0,
	"y":20.0
}
```

### Channel: `mod-node`

```json
{
	"nodeId":23,
	"property":"x",
	"newValue":"22"
}
```

```json
{
	"nodeId":23,
	"property":"y",
	"newValue":"25"
}
```

```json
{
      "nodeId": 40,
      "property": "color",
      "newValue": "green"
}
```

### Channel: `remove-node`
```json
{
	"nodeId":"10"
}
```

### Channel: `add-edge`
```json
{
	"edgeId":"32->2",
	"sourceId":2,
	"targetId":5,
	"weight":0
}
```

### Channel: `mod-edge`
```json
{
	"edgeId":23,
	"property":"color",
	"newValue":"green"
}
```

```json
{
	"edgeId":23,
	"property":"weight",
	"newValue":10
}
```

### Channel: `remove-edge`
```json
{
	"edgeId":"10->2"
}
```


## Metric View

### Channel: `new-metric-value`
```json
{
	"metric":"Latency",
	"timestamp":1,
	"value":120
}
```

## CFM View

Serialized context feature model (CFM). In our case we typically used manually serialized modeels originally using [CardyGAn](https://dl.acm.org/citation.cfm?id=2866619).

### Channel: `fm`

```json
{
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
  }
}
```

### Channel: `reconfiguration`

Reconfigurations originating from the self-aware computing system.

```json
{
  "stringFeatures": [
    {
      "name": "root"
    },
    {
      "name": "fsSystem"
    },
    {
      "name": "fsWOpt"
    },
    {
      "name": "fsTCAlgo"
    },
    {
      "name": "fsEKTC"
    },
    {
      "name": "fcContext"
    },
    {
      "name": "fcMobSpeed"
    },
    {
      "name": "fcScenario"
    },
    {
      "name": "fcDATACOLLECTION"
    },
    {
      "name": "fcTopology"
    }
  ],
  "stringAttributes": [
    {
      "realValue": 0,
      "name": "weightOptimizationThreshold"
    },
    {
      "intValue": 1,
      "name": "fsTCint"
    },
    {
      "realValue": 1,
      "name": "parameterEKtcK"
    },
    {
      "realValue": 0.005,
      "name": "mobilitySpeed"
    },
    {
      "realValue": 6.8,
      "name": "topologyDensity"
    },
    {
      "intValue": 40,
      "name": "nodeCount"
    },
    {
      "intValue": 136,
      "name": "edgeCount"
    },
    {
      "intValue": 700,
      "name": "worldSize"
    }
  ]
}
```

## Performance View

### Channel: `new-metricWeights`

```json
{
	"weights":[
		{"weight":"mEndToEndDropRate","factor":1.0},
		{"weight":"mEndToEndLatency","factor":1.0},
		{"weight":"mEJain","factor":1.0},
		{"weight":"mEMean","factor":1.0}
	]
}
```

## Event View

### Channel: `events`

```json
{
	"channel": "General",
	"title": "Warning",
	"text": "This is a warning",
	"warn": true
}
```

```json
{
	"channel": "General",
	"title": "Success",
	"text": "Successfully sent",
	"success": true
}
```

```json
{
	"channel": "General",
	"title": "General Message",
	"text": "No warning, no success"
}
```