import { useEffect } from 'react'

export default function FlyingInput({
  ssData,
  currentCell,
  setCurrentCell,
  cellRef,
  showFyingInput,
  setShowFlyingInput,
  inputRef,
  dispatch
}) {
  const rect = cellRef?.current?.getBoundingClientRect?.()
  const left =
    (rect?.left || 0) +
    (cellRef?.current?.ownerDocument.defaultView.pageXOffset || 0)
  const top =
    (rect?.top || 0) +
    (cellRef?.current?.ownerDocument.defaultView.pageYOffset || 0)

  useEffect(() => {
    inputRef.current.value = currentCell.input
  })

  return (
    <textarea
      className="cell-input"
      ref={inputRef}
      style={{
        left,
        top,
        display: showFyingInput ? 'inline' : 'none',
        height: rect?.height || 30,
        minWidth: rect?.width || 'auto'
      }}
      onChange={(e) => {}}
      onBlur={(e) => {
        showFyingInput && setShowFlyingInput(false)
        dispatch({
          x: currentCell.x,
          y: currentCell.y,
          value: e.target.value,
          type: 'set'
        })
      }}
      onKeyDown={(e) => {
        onFlyingInputKeyDown(
          e,
          cellRef,
          currentCell,
          inputRef,
          ssData,
          setCurrentCell,
          dispatch
        )
      }}
    />
  )
}

function onFlyingInputKeyDown(
  e,
  cellRef,
  currentCell,
  inputRef,
  ssData,
  setCurrentCell,
  dispatch
) {
  //console.log(e.key)
  if (e.key === 'Tab' || e.key === 'ArrowRight') {
    e.preventDefault()
    if (cellRef.current?.nextElementSibling) {
      if (currentCell.input !== inputRef.current.value) {
        dispatch({
          x: currentCell.x,
          y: currentCell.y,
          value: e.target.value,
          type: 'set'
        })
      }
      cellRef.current = cellRef.current.nextElementSibling
      const newCellValue = ssData.getCell(currentCell.x + 1, currentCell.y)
      setCurrentCell({
        ...currentCell,
        x: currentCell.x + 1,
        value: newCellValue.value,
        input: newCellValue.input
      })
    }
  } else if (e.key === 'Enter' || e.key === 'ArrowDown') {
    e.preventDefault()
    if (
      cellRef?.current?.parentElement?.nextElementSibling?.childNodes?.[
        currentCell?.x + 1
      ]
    ) {
      if (currentCell.input !== inputRef.current.value) {
        dispatch({
          x: currentCell.x,
          y: currentCell.y,
          value: e.target.value,
          type: 'set'
        })
      }
      const newCellValue = ssData.getCell(currentCell.x, currentCell.y + 1)
      if (newCellValue) {
        cellRef.current =
          cellRef?.current?.parentElement?.nextElementSibling.childNodes[
            currentCell.x + 1
          ]
        setCurrentCell({
          ...currentCell,
          y: currentCell.y + 1,
          value: newCellValue.value,
          input: newCellValue.input
        })
      }
    }
  }
}
