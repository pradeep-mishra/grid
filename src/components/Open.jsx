import { useRef } from 'react'

export default function OpenFile({ onContent }) {
  const inputRef = useRef(null)

  const onFileSelcted = (e) => {
    try {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        onContent(e.target.result)
      }
      reader.onerror = (e) => {
        console.log(e)
      }
      reader.readAsText(file, 'UTF-8')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <button className="btn open-btn" onClick={() => inputRef.current.click()}>
        Open
      </button>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        onChange={onFileSelcted}
      />
    </>
  )
}
