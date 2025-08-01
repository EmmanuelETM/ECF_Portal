import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { CalendarArrowDown } from "lucide-react";

export function DropdownButton({ options = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("Hoy");
  const dropdownRef = useRef(null);

  const handleClick = async (fn, label) => {
    await onSelect(fn);
    setText(label);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        className="border px-4 py-2 rounded-md"
        onClick={() => setOpen(!open)}
        Icon={CalendarArrowDown}
        text={text}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.label}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleClick(option.fn, option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
