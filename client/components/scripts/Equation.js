import { SympyPyodideEnv } from "./SympyPyodideEnv";
import _ from 'lodash';

export class Equation {
    selected = false;
    latex = "";
    computedVars = [];
    computedLHSLatex = "";
    computedLHSVars = null;
    computedRHSLatex = "";
    computedRHSVars = null;
    constructor(latex) {
      this.latex = latex;
    }
    setSelection(selected) {
        this.selected = selected;
    }
    async refreshComputed() { //Recalculate all computed values
      try {
        let res = await SympyPyodideEnv.getLHS(this.latex);
        this.computedLHSLatex = res.latex || "";
        this.computedLHSVars = [...res.vars] || [];
        _.remove(this.computedLHSVars, (item) => item == "pi" || item == "e");
      } catch (e) { console.log(e); }
      try {
        let res = await SympyPyodideEnv.getRHS(this.latex);
        this.computedRHSLatex = res.latex || "";
        this.computedRHSVars = [...res.vars] || [];
        _.remove(this.computedRHSVars, (item) => item == "pi" || item == "e");
      } catch (e) { console.log(e); }
      this.computedVars = [];
      this.computedVars = _.union(this.computedVars, this.computedLHSVars);
      this.computedVars = _.union(this.computedVars, this.computedRHSVars);
    }
}