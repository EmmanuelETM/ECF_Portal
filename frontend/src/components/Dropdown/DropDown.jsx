import { useState } from "react";
import { Button } from "../Button";
import { CalendarArrowDown } from "lucide-react";

export function DropdownButton({ options = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("Todos");

  const handleClick = async (fn, label) => {
    setText(label);
    setOpen(false);
    await onSelect(fn);
  };

  return (
    <div className="relative inline-block text-left">
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
