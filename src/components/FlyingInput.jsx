import { useEffect } from "react";

export default function FlyingInput({
  currentCell,
  cellRef,
  showFyingInput,
  setShowFlyingInput,
  inputRef,
  dispatch
}) {
  const rect = cellRef?.current?.getBoundingClientRect?.();
  const left =
    (rect?.left || 0) +
    (cellRef?.current?.ownerDocument.defaultView.pageXOffset || 0);
  const top =
    (rect?.top || 0) +
    (cellRef?.current?.ownerDocument.defaultView.pageYOffset || 0);

  useEffect(() => {
    inputRef.current.value = currentCell.input;
  });

  return (
    <textarea
      className="cell-input"
      ref={inputRef}
      style={{
        left,
        top,
        display: showFyingInput ? "inline" : "none",
        height: rect?.height || 30,
        minWidth: rect?.width ? rect?.width : "auto"
      }}
      onChange={(e) => {}}
      onBlur={(e) => {
        showFyingInput && setShowFlyingInput(false);
        dispatch({
          x: currentCell.x,
          y: currentCell.y,
          value: e.target.value,
          type: "set"
        });
      }}
    />
  );
}
