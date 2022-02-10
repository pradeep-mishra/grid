export default function Cell({
  cols,
  x,
  y,
  cell,
  cellRef,
  setShowFlyingInput,
  setCurrentCell
}) {
  return (
    <td
    tabIndex={ (cols*y) + x}
    className={y === 0 ? "user-head" : ""}
    onClick={(e) => {
      cellRef.current = e.currentTarget;
      setCurrentCell({
        x,
        y,
        value: cell.value,
        input: cell.input
      });
      setShowFlyingInput((showFlyingInput) => !showFlyingInput);
    }}
    >
      {cell.value}
    </td>
  );
}
