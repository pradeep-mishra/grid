import { useEffect, useRef, useState } from "react";

export default function Header({ ssTitle = "Spreadsheet 1" }) {
  const [title, setTitle] = useState(ssTitle);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.value = title;
    }
  });

  return (
    <header>
      <div>
        <h1>{title}</h1>
        <input
          ref={inputRef}
          style={{
            width: "100%",
            height: "100%",
            display: isOpen ? "inline" : "none"
          }}
          type="text"
          onChange={(e) => {}}
          onBlur={(e) => {
            setTitle(e.target.value);
            setIsOpen(false);
          }}
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </header>
  );
}
