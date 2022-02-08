import { useReducer } from "react";
import SpreadsheetCls from "../lib/spreadsheet";
import ssReducer from "../reducer/spreadsheet";

export default function useSpreadsheet(rows, cols) {
  const [{ data }, dispatch] = useReducer(ssReducer, {
    data: new SpreadsheetCls(rows, cols)
  });
  return [data, dispatch];
}
