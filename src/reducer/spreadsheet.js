import { applyFunc } from "../lib/func";

function checkAllFunc(data) {
  data.cells = data.cells.map((cell) => {
    if (cell?.input?.charAt?.(0) === "=") {
      cell.value = applyFunc(
        cell.input.substring(1).trim(),
        {
          x: cell.x,
          y: cell.y,
          value: cell.value,
          tye: "set"
        },
        data
      );
    }
    return cell;
  });
  return data;
}

export default function reducer(state, action) {
  switch (action.type) {
    case "set":
      const cell = state.data.getCell(action.x, action.y);
      if (typeof action.value === "string" && action.value.charAt(0) === "=") {
        cell.input = action.value;
        cell.value = applyFunc(
          action.value.substring(1).trim(),
          action,
          state.data
        );
      } else {
        cell.value = action.value;
        cell.input = action.value;
      }
      state.data = checkAllFunc(state.data, action);
      return {
        data: state.data
      };
    default:
      throw new Error();
  }
}
