export default function Cell({
  x,
  y,
  cell,
  cellRef,
  setShowFlyingInput,
  setCurrentCell
}) {
  return (
    <td
      onClick={(e) => {
        cellRef.current = e.currentTarget;
        setCurrentCell({
          x,
          y,
          value: cell.value,
          input: cell.input
        });
        setShowFlyingInput((isEditText) => !isEditText);
      }}
    >
      {cell.value}
    </td>
  );
}
