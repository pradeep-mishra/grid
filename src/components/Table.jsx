import Cell from './Cell'

function range(length) {
  return Array.from({ length }, (_, i) => i)
}

function getColumnId(index) {
  if (index >= 26) {
    const first = Math.floor(index / 26) - 1
    const second = index % 26
    const id = getColumnId(first) + getColumnId(second)
    return id
  }
  return String.fromCharCode('A'.charCodeAt(0) + index)
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
  //console.log('rows,cols', rows, cols);
  return (
    <table ref={tableRef} className="ss-table">
      <thead>
        <tr className="ss-top-row">
          <td className="name-cell top-head sticky-cell" />
          {range(cols).map((x) => (
            <td key={'tg-' + x} className="in-middle name-cell">
              {getColumnId(x)}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {range(rows).map((y) => (
          <tr key={y}>
            <td
              key={'sg-' + y}
              style={{ zIndex: y === 0 ? '1' : '0' }}
              className={`in-middle name-cell left-head ${
                y === 0 ? 'user-head' : ''
              }`}
            >
              {y}
            </td>
            {range(cols).map((x) => (
              <Cell
                cols={cols}
                key={y + '-' + x}
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
  )
}
