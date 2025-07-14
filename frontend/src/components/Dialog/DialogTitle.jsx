import { X } from "lucide-react";

export function DialogTitle({ title, closeDialog }) {
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h2 className="text-xl font-semibold truncate">{title}</h2>
      <button
        className="text-gray-500 hover:text-black cursor-pointer"
        onClick={closeDialog}
      >
        <X size={20} />
      </button>
    </div>
  );
}
