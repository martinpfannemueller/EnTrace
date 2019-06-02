import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuew.store({
    state: {
        edges: [],
        nodes: [],
        weights: [],
        metrics: []
    }
});
