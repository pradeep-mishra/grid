import { useRef, useState } from "react";

export default function Header({ ssTitle = "Spreadsheet 1" }) {
  const [title, setTitle] = useState(ssTitle);
  const titleRef = useRef(null);
  const titleInputRef = useRef(null);

  return (
    <header>
      <div 
      onClick={(e)=>{
        titleRef.current.style.visibility = "hidden";
      }}
      className="ss-title" 
      >
        <div 
        ref={titleRef} 
        className="ss-title-label" 
        style={{pointerEvents: "none", maxWidth: "960px" , visibility: "visible"}} >
          <span>
            {title}
          </span>
        </div>
        <input
        ref={titleInputRef} 
        value={title}
        className="ss-title-input" 
        type="text" 
        tabIndex="0" 
        dir="ltr" 
        style={{visibility: "visible", width: "254px"}} 
        onChange={(e)=>setTitle(e.currentTarget.value)}
        onBlur={()=>{
          titleRef.current.style.visibility = "visible";
        }}
        />

      </div>
      <div></div>
      <div></div>
      <div></div>
    </header>
  );
}
