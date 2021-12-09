<template>
  <div>
    <q-dialog
      v-model="show_menu"
      persistent
      transition-show="jump-down"
      transition-hide="flip-up"
      position="top"
    >
      <q-card style="width:80%; max-width: 800px;">
        <q-bar>
          <div class="non-selectable">Actions</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-bar>
        <q-list bordered>
          <q-item
            v-for="(action, idx) in actionlist"
            @click="(event) => { action.run(event.target); show_menu = false; }"
            clickable
            v-ripple
          >
            <q-item-section>{{ action.defination }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
    <result-display ref="result_display" />
  </div>
</template>

<script>
import resultdisplay from "./result-display.vue";

import _ from 'lodash';
import { SympyPyodideEnv } from "./scripts/SympyPyodideEnv";
import { useQuasar } from 'quasar';

export default {
  props: ["equation_list", "selected_equation_list"],
  data: function () {
    return {
      actionlist: [],
      show_menu: false,
      all_vars: [],
      useQuasar: null,
    };
  },
  mounted() {
    this.useQuasar = useQuasar();
  },
  methods: {
    show() {
      this.update_actionlist();
      this.show_menu = true;
    },
    async update_actionlist() {
      for (let eq of this.selected_equation_list) await eq.refreshComputed();

      // --- Calculate some values we might need later ---
      let all_vars = []; let all_has_rhs = true;
      for (let eq of this.selected_equation_list) {
        all_vars = _.union(all_vars, eq.computedVars);
        if (eq.computedRHSLatex == null || eq.computedRHSLatex.trim() == "") all_has_rhs = false;
      }
      this.all_vars = all_vars;

      // --- Add action buttons ---
      this.actionlist = [];

      // Solve system
      if (all_has_rhs)
        for (let variable of all_vars)
          this.actionlist.push({ defination: `Solve System for ${variable}`, run: (elem) => this.solve(elem, variable) });

      // Simplify and Evaluate
      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedRHSLatex == "" && this.selected_equation_list[0].computedLHSVars.length == 0) // has lhs with no variables and no rhs
        this.actionlist.push({ defination: `Evaluate`, run: (elem) => this.simplify(elem, "numbers") });

      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedRHSLatex == "" && this.selected_equation_list[0].computedLHSVars.length > 0) // has lhs with variables and no rhs
        this.actionlist.push({ defination: `Simplify`, run: (elem) => this.simplify(elem, "polynomial") });

      // Differentiate
      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedRHSLatex == "" && this.selected_equation_list[0].computedLHSVars.length > 0) // has lhs with variables and no rhs
        for (let variable of this.selected_equation_list[0].computedLHSVars)
          this.actionlist.push({ defination: `Differentiate with respect to ${variable}`, run: (elem) => this.diferentiate_or_integrate(elem, variable, "lhs", "diff") });

      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedRHSLatex != "" && this.selected_equation_list[0].computedLHSVars.length > 0) // has lhs with variables and has rhs
        for (let variable of this.selected_equation_list[0].computedLHSVars)
          this.actionlist.push({ defination: `Differentiate L.H.S. with respect to ${variable}`, run: (elem) => this.diferentiate_or_integrate(elem, variable, "lhs", "diff") });

      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedLHSLatex != "" && this.selected_equation_list[0].computedRHSLatex != "" && this.selected_equation_list[0].computedRHSVars.length > 0) // has lhs with variables and has rhs with variables
        for (let variable of this.selected_equation_list[0].computedRHSVars)
          this.actionlist.push({ defination: `Differentiate R.H.S. with respect to ${variable}`, run: (elem) => this.diferentiate_or_integrate(elem, variable, "rhs", "diff") });
      
      // Integrate
      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedRHSLatex == "" && this.selected_equation_list[0].computedLHSVars.length > 0) // has lhs with variables and no rhs
        for (let variable of this.selected_equation_list[0].computedLHSVars)
          this.actionlist.push({ defination: `Integrate with respect to ${variable}`, run: (elem) => this.diferentiate_or_integrate(elem, variable, "lhs", "integrate") });

      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedRHSLatex != "" && this.selected_equation_list[0].computedLHSVars.length > 0) // has lhs with variables and has rhs
        for (let variable of this.selected_equation_list[0].computedLHSVars)
          this.actionlist.push({ defination: `Integrate L.H.S. with respect to ${variable}`, run: (elem) => this.diferentiate_or_integrate(elem, variable, "lhs", "integrate") });

      if (this.selected_equation_list.length == 1 && this.selected_equation_list[0].computedLHSLatex != "" && this.selected_equation_list[0].computedRHSLatex != "" && this.selected_equation_list[0].computedRHSVars.length > 0) // has lhs with variables and has rhs with variables
        for (let variable of this.selected_equation_list[0].computedRHSVars)
          this.actionlist.push({ defination: `Integrate R.H.S. with respect to ${variable}`, run: (elem) => this.diferentiate_or_integrate(elem, variable, "rhs", "integrate") });

      // Delete Equation
      this.actionlist.push({ defination: "Delete Equation(s)", run: (elem) => this.delete(elem) });
    },
    // Functions for performing the action
    delete(elem) {
      _.remove(this.equation_list, o => { return o.selected; });
    },
    async solve(elem, variable) {
      let equations_in_code = ""; let equations_in_latex = "";
      for (let eq of this.selected_equation_list) {
        if (equations_in_code != "") equations_in_code += ",";
        equations_in_code += `parse_latex('${eq.latex.replaceAll("\\", "\\\\")}')`;
        equations_in_latex += `<br><math-field read-only class="inline-math">${eq.latex}</math-field>`;
      }
      try {
        // Special Case
        let all_vars = [];
        all_vars = this.all_vars; _.remove(all_vars, (item) => item == variable);
        let error = null;
        while (all_vars.length >= 0) {
          let vars_in_code = "";
          for (let variabl of all_vars) {
            vars_in_code += `,'${variabl}'`;
          }
          let code = `
          result = latex(list(nonlinsolve([${equations_in_code}], ['${variable}'${vars_in_code}]))[0][0])
          `;
          console.log(code);
          try {
            let res = await SympyPyodideEnv.runCode(code);
            this.$refs.result_display.show(`<b>Action</b> <br>${elem.innerText}: ${equations_in_latex} <br><br><b>Answer</b> <br> <math-field read-only class="block-math">${res}</math-field>`);
            return;
          } catch (e) {
            error = e;
            let poped = all_vars.pop();
            if(!poped) break;
          }
        }
        throw error;
      }
      catch (e) { console.error(e); this.useQuasar.notify({ type: 'negative', position: 'top-right', message: `Failed to perform action. Please see console for details.` }); }
    },
    async diferentiate_or_integrate(elem, variable, lhs_or_rhs, diff_or_integrate) {
      let eqn;
      if (lhs_or_rhs.toLowerCase() == "lhs")
        eqn = this.selected_equation_list[0].computedLHSLatex;
      else
        eqn = this.selected_equation_list[0].computedRHSLatex;
      let variable_ex = `'${variable}'`;
      if (diff_or_integrate == "integrate") variable_ex = `(${variable_ex},None,None)`;
      
      let code = `
        result = latex(${diff_or_integrate}(parse_latex('${eqn.replaceAll("\\", "\\\\")}'), ${variable_ex}))
      `;
      console.log(code);
      try {
        let res = await SympyPyodideEnv.runCode(code);
        this.$refs.result_display.show(`<b>Action</b> <br>${elem.innerText}: <br><math-field read-only class="inline-math">${eqn}</math-field> <br><br><b>Answer</b> <br> <math-field read-only class="block-math">${res}</math-field>`);
      }
      catch (e) { console.error(e); this.useQuasar.notify({ type: 'negative', position: 'top-right', message: `Failed to perform action. Please see console for details.` }); }
    },
    async simplify(elem, polynomial_or_numbers) {
      let code = `
        result = simplify(parse_latex('${this.selected_equation_list[0].latex.replaceAll("\\", "\\\\")}'))
        result = result.subs('pi', ${Math.PI})
        result = result.subs('e', ${Math.E})
        result = latex(result.evalf())
      `;
      console.log(code);
      try {
        let res = await SympyPyodideEnv.runCode(code);
        this.$refs.result_display.show(`<b>Action</b> <br>${elem.innerText}: <br><math-field read-only class="inline-math">${this.selected_equation_list[0].computedLHSLatex}</math-field> <br><br><b>Answer</b> <br> <math-field read-only class="block-math">${res}</math-field>`);
      }
      catch (e) { console.error(e); this.useQuasar.notify({ type: 'negative', position: 'top-right', message: `Failed to perform action. Please see console for details.` }); }
    }
  },
  components: {
    'result-display': resultdisplay,
  }
};
</script>

<style lang="css">
</style>
