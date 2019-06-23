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
  // props: ["weight", "factor", "index"],
  props: {
    weight: {
      type: String,
      default: ""
    },
    factor: {
      type: Number,
      default: undefined
    },
    index: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      modelledFactor: ""
    };
  },
  computed: {
    ...mapState(["weights"])
  },
  watch: {
    factor: function() {
      // eslint-disable-next-line no-undef
      this.modelledFactor = factor;
    }
  },
  mounted() {
    this.modelledFactor = this.factor;
  },
  methods: {
    ...mapMutations(["updateSingleWeight"])
  }
};
</script>

<style scoped>
.b-form-input {
  margin: 3px;
}
</style>
