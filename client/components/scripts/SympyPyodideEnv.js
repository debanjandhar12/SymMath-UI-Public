var pyodide;
export class SympyPyodideEnv {
  static async initialize() {
    pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full" });
    await pyodide.loadPackage(["sympy", "micropip"]);
    await pyodide.runPythonAsync(`
    import micropip
    await micropip.install('/antlr4_python3_runtime-4.9.3-py3-none-any.whl')
    from sympy import *
    from sympy.parsing.latex import parse_latex`);
    console.log("SympyPyodideEnv has been initialized.");
    try { this.getLHS("x") } catch (e) { console.log(e); }
  }
  static async getLHS(expr) {
    if (!pyodide) throw "SympyPyodideEnv not intialized yet";
    await pyodide.runPython(`
      func = parse_latex('${expr.replaceAll("\\", "\\\\")}')
      if hasattr(func, 'lhs'):
        result = latex(func.lhs)
        result2 = [str(symbol) for symbol in (func.lhs.free_symbols)]        
      else:
        result = latex(func)
        result2 = [str(symbol) for symbol in (func.free_symbols)]
    `);
    let result2 = pyodide.globals.get('result2');
    if (result2 && result2.hasOwnProperty('prop')) result2 = result2.toJs({ create_proxies: false })
    return { latex: pyodide.globals.get('result'), vars: result2 };
  }

  static async getRHS(expr) {
    if (!pyodide) throw "SympyPyodideEnv not intialized yet";
    await pyodide.runPython(`
      func = parse_latex('${expr.replaceAll("\\", "\\\\")}')
      if hasattr(func, 'rhs'):
        result = latex(func.rhs)
        result2 = [str(symbol) for symbol in (func.rhs.free_symbols)]  
      else:
        result = None 
        result2 = None
    `);
    let result2 = pyodide.globals.get('result2');
    if (result2 && result2.hasOwnProperty('prop')) result2 = result2.toJs({ create_proxies: false })
    return { latex: pyodide.globals.get('result'), vars: result2 };
  }

  static async runCode(code) {
    if (!pyodide) throw "SympyPyodideEnv not intialized yet";
    await pyodide.runPython(`
      ${code}
    `);
    let result = pyodide.globals.get('result');
    if (result.hasOwnProperty('prop')) result = result.toJs({ create_proxies: false })
    return result;
  }
}
