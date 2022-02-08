import { useEffect, useRef, useState } from "react";
import FlyingInput from "./FlyingInput";
import FnRibbon from "./FnRibbon";
import Table from "./Table";

export default function Spreadsheet({ cols, rows , data , dispatch}) {
  const [showFyingInput, setShowFlyingInput] = useState(false);
  const [currentCell, setCurrentCell] = useState({
    x: 0,
    y: 0,
    value: "",
    input: ""
  });
  const cellRef = useRef(null);
  const inputRef = useRef(null);
  const tableRef = useRef(null);

  const cellPointer = data.getCellTitle(currentCell.x, currentCell.y) || "A0";
  const cellValue = data.getCell(currentCell.x, currentCell.y)?.input || "";

  const setFuncInput = (value) => {
    dispatch({
      x: currentCell.x,
      y: currentCell.y,
      value: value,
      type: "set"
    });
  };

  useEffect(() => {
    if (showFyingInput) {
      inputRef.current.focus();
    }
  }, [showFyingInput]);

  return (
    <div>
      <FnRibbon
        cell={cellPointer}
        funcInput={cellValue}
        setFuncInput={setFuncInput}
      />
      <Table
        tableRef={tableRef}
        ssData={data}
        cols={cols}
        rows={rows}
        cellRef={cellRef}
        setShowFlyingInput={setShowFlyingInput}
        setCurrentCell={setCurrentCell}
      />
      <FlyingInput
        currentCell={currentCell}
        cellRef={cellRef}
        showFyingInput={showFyingInput}
        setShowFlyingInput={setShowFlyingInput}
        inputRef={inputRef}
        dispatch={dispatch}
      />
    </div>
  );
}
