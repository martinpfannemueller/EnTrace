<template>
  <b-container fluid>
    <h4>
      🐨
      <strong>CoalaViz</strong>: Enhanced Traceability in Adaptive Communication Systems
    </h4>
    <hr>
    <b-row>
      <b-col class="main">
        <network-view/>
      </b-col>
      <b-col class="main">
        <metric-view/>
        <context-feature-model :cfmInput="cfm" :cfmInput2="cfm2"/>
        <!-- <d3-test :cfmInput="cfm" :cfmInput2="cfm2"/> -->
        <performance-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NetworkView from "./views/NetworkView.vue";
import MetricView from "./views/MetricView.vue";
import ContextFeaureModel from "./views/ContextFeatureModel.vue";
import PerformanceView from "./views/PerformanceView.vue";

export default {
  components: {
    "network-view": NetworkView,
    "metric-view": MetricView,
    "context-feature-model": ContextFeaureModel,
    "performance-view": PerformanceView,
  },
  data: function() {
    return {
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
      ]
    };
  },
  props: {

  },
  mounted() {
  }
};
</script>

<style>
.main {
  /* padding-left: 5px;
  padding-right: 5px; */
}

.card-header {
  padding-left: 12px;
  padding-right: 7px;
  padding-top: 7px;
  padding-bottom: 7px;
}

.card {
  margin-top: 10px;
}

.card-body {
  padding: 5px;
}

.show {
  overflow: hidden;
}

h4 {
  padding-top: 8px;
}
h5 {
  margin-bottom: 0px;
}
</style>
