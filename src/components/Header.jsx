import { useEffect, useRef, useState } from 'react'
import OpenButton from './Open'
import SaveButton from './Save'

function isDefined(value) {
  return value !== undefined && value !== null
}

function isNumber(value) {
  return typeof value === 'number'
}

export default function Header({ ssData, dispatch }) {
  const [title, setTitle] = useState(ssData.title)
  const titleRef = useRef(null)
  const titleInputRef = useRef(null)

  const onOpenFileData = (json) => {
    try {
      const data = JSON.parse(json)
      data.title = data.title || 'Spreadsheet 1'
      if (
        data?.cells &&
        isNumber(data.rows) &&
        isNumber(data.cols) &&
        isDefined(data.title)
      ) {
        data.cells = data.cells.map((cell) => {
          if (cell === 0) {
            return {
              input: '',
              value: ''
            }
          }
          return cell
        })
        dispatch({
          type: 'load',
          data: data
        })
        setTitle(data.title)
        document.title = data.title
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSaveFile = (callback) => {
    const saveData = {
      title: ssData.title,
      rows: ssData.rows,
      cols: ssData.cols,
      cells: ssData.cells.map((cell) => {
        if (cell.value || cell.input) {
          return cell
        }
        return 0
      })
    }

    callback(JSON.stringify(saveData), ssData.title)
  }

  useEffect(() => {
    titleInputRef.current.value = title
  })

  return (
    <header>
      <div
        onClick={(e) => {
          titleRef.current.style.visibility = 'hidden'
        }}
        className="ss-title"
      >
        <div
          ref={titleRef}
          className="ss-title-label"
          style={{
            pointerEvents: 'none',
            maxWidth: '960px',
            visibility: 'visible'
          }}
        >
          <span>{title}</span>
        </div>
        <input
          ref={titleInputRef}
          className="ss-title-input"
          type="text"
          tabIndex="0"
          dir="ltr"
          style={{ visibility: 'visible', width: '254px' }}
          onChange={(e) => {}}
          onBlur={(e) => {
            ssData.setTitle(e.currentTarget.value)
            setTitle(e.currentTarget.value)
            document.title = e.currentTarget.value
            titleRef.current.style.visibility = 'visible'
          }}
        />
      </div>
      <div className="btn-container">
        <OpenButton onContent={onOpenFileData} />
        <SaveButton onSave={onSaveFile} />
      </div>
    </header>
  )
}
