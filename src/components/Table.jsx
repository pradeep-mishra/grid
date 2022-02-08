import Cell from "./Cell";

function range(length) {
  return Array.from({ length }, (_, i) => i);
}

function getColumnId(index) {
  if (index >= 26) {
    const first = Math.floor(index / 26) - 1;
    const second = index % 26;
    const id = getColumnId(first) + getColumnId(second);
    return id;
  }
  return String.fromCharCode("A".charCodeAt(0) + index);
}

export default function Table({
  tableRef,
  cols,
  rows,
  ssData,
  cellRef,
  setShowFlyingInput,
  setCurrentCell
}) {
  return (
    <table ref={tableRef} className="ss-table">
      <tbody>
        <tr>
          <td />
          {range(cols).map((x) => (
            <td key={"tg-" + x} className="in-middle">
              <div className="col-name">{getColumnId(x)}</div>
            </td>
          ))}
        </tr>

        {range(rows).map((y) => (
          <tr key={y}>
            <td className="in-middle" key={"sg-" + y}>
              {y}
            </td>
            {range(cols).map((x) => (
              <Cell
                key={y + "-" + x}
                x={x}
                y={y}
                cell={ssData.getCell(x, y)}
                cellRef={cellRef}
                setShowFlyingInput={setShowFlyingInput}
                setCurrentCell={setCurrentCell}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
