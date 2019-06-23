<template>
  <b-col>
    <b-form-input
      v-model="modelledFactor"
      size="sm"
      @blur="
        updateSingleWeight({
          index: index,
          newWeight: { weight, factor: modelledFactor }
        })
      "
    ></b-form-input>
    <div class="mt-2 text-muted interface-text">{{ weight }}</div>
  </b-col>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["weight", "factor", "index"],
  data() {
    return {
      modelledFactor: ""
    };
  },
  watch: {
    factor: function() {
      this.modelledFactor = factor;
    }
  },
  computed: {
    ...mapState(["weights"])
  },
  methods: {
    ...mapMutations(["updateSingleWeight"])
  },
  mounted() {
    this.modelledFactor = this.factor;
  }
};
</script>

<style scoped>
.b-form-input {
  margin: 3px;
}
</style>
