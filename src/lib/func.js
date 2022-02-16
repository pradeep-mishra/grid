const funcRegex = /^(\w+)\(([a-z0-9,:]+)\)$/i;
const evalRegex = /^eval\((.+)\)$/i;
const cellPointerRegex = /^([a-z]+)([0-9]+)$/i;

const func = {
  sum
};

function getColumnId(index) {
  if (index >= 26) {
    const first = Math.floor(index / 26) - 1;
    const second = index % 26;
    const id = getColumnId(first) + getColumnId(second);
    return id;
  }
  return String.fromCharCode("A".charCodeAt(0) + index);
}

function getNumberFromAlpha(alpha) {
  let result = 0;
  let alphaReversed = alpha.toUpperCase().split("").reverse();
  for (let i = 0; i < alphaReversed.length; i++) {
    const thisNum = 
      (alphaReversed[i].charCodeAt(0) - 64) * (26 * i === 0 ? 1 : 26 * i);
    result += thisNum;
  }
  return result;
}

function isExcelRange(str) {
  let args = str.split(':')
  return args.length === 2 && args[0].match(cellPointerRegex) && args[1].match(cellPointerRegex);
}

function getFullExcelRange(args) {
  let start = args[0];
  let end = args[1];
  let startCell = start.match(cellPointerRegex);
  let endCell = end.match(cellPointerRegex);
  let result = [];
  if (startCell && endCell) {
    if(args[0].charAt(0).toLowerCase() === args[1].charAt(0).toLowerCase()){
      for(var i = Number(startCell[2]); i<= Number(endCell[2]) ;i++ ){
        result.push(startCell[1] + i);
      }
    }/* {TODO} else if(startCell[2] === endCell[2]){
      while(true){

      }
    }*/
  }
  return result;
}

function rangeSum(arg, state) {
  let range = getFullExcelRange(arg.split(':'));
  range = range.map(point => pointerToValue(state)(point));
  return range.reduce((acc, val) => {
    if (acc === "#Invalid_Value" || isNaN(val)) {
      return "#Invalid_Value";
    }
    return acc + val;
  }, 0);
}


function sum(args, action, state) {
  const result = args.reduce((acc, arg) => {
    if (acc === "#Invalid_Value") {
      return acc;
    }
    if(isExcelRange(arg)){
      return rangeSum(arg, state);
    }
    if (!isNaN(arg)) {
      return acc + Number(arg);
    }
    const cell = arg.match(cellPointerRegex);
    if (!cell || !cell.length === 3) {
      return "#Invalid_Value";
    }
    const x = getNumberFromAlpha(cell[1]);
    const value = state.getCell(x - 1, Number(cell[2]));
    if (value && typeof value.value !== "undefined") {
      let val = value.value;
      if (val === "" || val === null) {
        val = 0;
      }
      if (!isNaN(val)) {
        val = Number(val);
        return acc + val;
      }
    }
    return "#Invalid_Value";
  }, 0);
  return result;
}

function pointerToValue(state) {
  return function (point, numCast = true) {
    const cell = point.match(cellPointerRegex);
    if (!cell || !cell.length === 3) {
      return "#Invalid_Value";
    }
    const x = getNumberFromAlpha(cell[1]);
    const value = state.getCell(x - 1, Number(cell[2]));
    if (value && typeof value.value !== "undefined") {
      let val = value.value;
      if (val === "" || val === null) {
        val = "";
      }
      return !isNaN(val) && numCast ? Number(val || 0) : val;
    }
    return "";
  };
}

function evalFunc(args, action, state) {
  let result;
  const context = {
    GetVal: pointerToValue(state)
  };

  function execEval() {
    try {
      return eval(args);
    } catch (e) {
      return "#ERROR: " + e.message;
    }
  }
  return execEval.call(context);
}

export function applyFunc(str, action, state) {
  let funcs = str.split("|>");
  const result = funcs.reduce((prev, curr) => {
    if (prev === "#Invalid_Func") {
      return prev;
    }
    const evalMatch = curr.match(evalRegex);
    if (evalMatch && evalMatch.length) {
      return evalFunc(evalMatch[1], action, state);
    }
    const funcData = curr.match(funcRegex);
    if (
      !funcData ||
      funcData.length !== 3 ||
      typeof func[funcData[1].toLowerCase()] !== "function"
    ) {
      return "#Invalid_Func";
    }
    const args = funcData[2].split(",");
    if (prev) {
      args.unshift(prev);
    }
    return func[funcData[1].toLowerCase()](args, action, state);
  }, "");
  return result;
}
