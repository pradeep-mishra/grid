import { useRef } from 'react';

export default function SaveFile({onSave}){
  const aLinkRef = useRef(null);
  const save = (json, title='spreadsheet') => {
    let ssBlob = new Blob([json], { type: 'application/json' });
    aLinkRef.current.href = URL.createObjectURL(ssBlob);
    aLinkRef.current.download = title + '.json';
    aLinkRef.current.click();
  }

  return (
    <>
    <button 
    className="btn save-btn"
    onClick={()=>{
      onSave(save);
    }}
    >
      Save
    </button>
    <a
    ref={aLinkRef}
    download=""
    href=""
    style={{"display":"none"}}
    >
      Download
    </a>
    </>
  )
}