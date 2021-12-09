<template>
  <q-item v-ripple class="no-padding">
    <q-item-section class="non-selectable no-margin no-padding">
      <math-field ref="mathfield" @input="updateLatex" :value="equation.latex" style="padding: 0px 8px;font-size:20px;"></math-field>
    </q-item-section>
    <q-item-section side top class="no-padding" style="padding-top: 4px !important;">
      <q-checkbox @click="toogleSelection" :model-value="equation.selected" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["equation"],
  data: () => {
    return {
    };
  },
  mounted() {
  },
  methods: {
    toogleSelection() {this.equation.selected = !this.equation.selected;},
    updateLatex(e) {this.equation.latex = e.srcElement.value;}
  }
};
</script>

<style lang="css">
</style>
