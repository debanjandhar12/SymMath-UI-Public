<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <q-header class="bg-primary text-white">
        <q-toolbar>
          <div class="non-selectable">SymMath UI</div>
          <q-space />
          <q-btn dense flat icon="add" @click="add_equation_to_equation_list">
            <q-tooltip class="bg-white text-primary">Add Equation</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="more_vert"
            @click="this.$refs.actions_menu.show()"
            :disabled="selected_equation_list.length <= 0"
          >
            <q-tooltip class="bg-white text-primary">Open Action Menu</q-tooltip>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-list bordered separator>
          <equation-item v-for="(equation, idx) in equation_list" :equation="equation" :idx="idx" />
        </q-list>
      </q-page-container>
    </q-layout>
    <actions-menu
      ref="actions_menu"
      :equation_list="equation_list"
      :selected_equation_list="selected_equation_list"
    />
  </div>
</template>

<script>
import equationitem from "./equation-item.vue";
import actionsmenu from "./actions-menu.vue";

import { Equation } from "./scripts/Equation.js";
import { SympyPyodideEnv } from "./scripts/SympyPyodideEnv";
import { useQuasar } from 'quasar';
import _ from 'lodash';

export default {
  data: function () {
    return {
      user: user,
      equation_list: [new Equation("x = 1")],
      show_actions_menu: false,
      useQuasar: null,
      app_load_notification: null
    };
  },
  computed: {
    selected_equation_list: function () {
      let modified_eqnlist = this.equation_list.map((eqn, i) => { eqn.idx = i; return eqn; });
      return _.filter(modified_eqnlist, function (o) {
        return o.selected == true;
      });
    }
  },
  created: function () {
    SympyPyodideEnv.initialize().then(() => {
      if (this.app_load_notification)
        this.app_load_notification({ icon: 'done', type: 'positive', multiLine: true, timeout: 1000, position: 'bottom-right', message: `App loaded. \n Welcome, ${user.name}!` });
    });
    this.download_equation_list();
    window.addEventListener('beforeunload', this.upload_equation_list);
  },
  mounted: function () {
    this.useQuasar = useQuasar();
    this.app_load_notification = this.useQuasar.notify({ type: 'ongoing', multiLine: true, timeout: 60000, position: 'bottom-right', message: `Loading app...` });
  },
  methods: {
    async download_equation_list() {
      let downloaded_data = await (await fetch('./getEqnList.json')).json();

      if (downloaded_data.length > 0) {
        this.equation_list = downloaded_data.map(latex => new Equation(latex));
      }
    },
    async upload_equation_list() {
      let upload_data = this.equation_list.map(eqn => eqn.latex);

      // Send the data to the server
      const body = JSON.stringify({ equation_list: upload_data });
      try {
        const blob = new Blob([body], {type: 'application/json; charset=UTF-8'});
        navigator.sendBeacon('./setEqnList.json', blob);
      } catch(e) {
        fetch('./setEqnList.json', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: body,
          keepalive: true
        });
      }
    },
    add_equation_to_equation_list() {
      console.log(this.equation_list);
      this.equation_list.push(new Equation(String.fromCharCode(97 + Math.floor(Math.random() * 26)) + " = 1"));
    },
  },
  components: {
    'equation-item': equationitem,
    'actions-menu': actionsmenu
  }
};
</script>

<style lang="css">
</style>