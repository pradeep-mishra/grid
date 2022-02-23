import { useEffect, useRef } from 'react'

export default function FnRibbon({ cell, funcInput, setFuncInput }) {
  const funcInputRef = useRef(null)

  useEffect(() => {
    funcInputRef.current.value = funcInput
  })

  return (
    <div className="fn-ribbon">
      <div>{cell}</div>
      <div>Func</div>
      <div>
        <input
          ref={funcInputRef}
          type="text"
          onChange={(e) => {}}
          onBlur={(e) => {
            setFuncInput(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
