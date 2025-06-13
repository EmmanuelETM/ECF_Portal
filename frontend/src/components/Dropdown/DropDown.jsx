import { useState } from "react";
import { Button } from "../Button";
import { CalendarArrowDown } from "lucide-react";

export function DropdownButton({ options = [], onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <Button
        Icon={CalendarArrowDown}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
