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
    //tabIndex={ (cols*x) + y}
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
