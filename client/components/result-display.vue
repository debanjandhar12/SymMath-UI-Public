<template>
  <div>
    <q-dialog
      v-model="show_result"
      persistent
      :maximized="maximized"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="min-width: 600px;">
        <q-bar>
          <div class="non-selectable">Action Result</div>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximized = false" :disable="!maximized">
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximized = true" :disable="maximized">
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
          </q-btn>
        </q-bar>
        <q-card-section class="q-pt-none" v-html="contents"></q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import { useQuasar } from 'quasar';

export default {
  data: function () {
    return {
      show_result: false,
      useQuasar: null,
      contents: null,
      maximized: true,
    };
  },
  mounted() {
    this.useQuasar = useQuasar();
  },
  methods: {
    show(contents) {
      this.maximized = true;
      this.contents = contents;
      this.show_result = true;
    }
  }
};
</script>

<style lang="css">
.inline-math {
  font-size: 18px; 
  margin: 0px !important;
  padding: 0px !important; 
  border-radius: 0px !important;
  border: 0px; 
  box-shadow: 0px;
  background-color: transparent;
  display: inline-block;
}
.block-math {
  font-size: 22px; 
  padding: 0px !important; 
  border-radius: 0px !important;
  border: 0px; 
  box-shadow: 0px;
  background-color: transparent;
  display: table;
  margin: 0 auto;
}
b {
    font-size: 24px; 
}
</style>
