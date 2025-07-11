import { useRef, useState, useEffect } from "react";
import { File, X } from "lucide-react";

export function LogDialog({ archivo, view }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && view === "emision") {
      console.log("somshi");
    }
  }, [open, view]);

  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setOpen(false);
  };
  return (
    <>
      <button
        className="cursor-pointer p-2 rounded-lg text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white"
        onClick={openDialog}
      >
        <File size={20} />
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg w-[90%] max-w-5xl h-[80vh] backdrop:backdrop-blur-sm border p-0"
        style={{ inset: 0, margin: "auto" }}
        onClose={closeDialog}
      >
        <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold truncate">{archivo}</h2>
            <button
              className="text-gray-500 hover:text-black"
              onClick={closeDialog}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto bg-stone-200 border text-left border-stone-400 rounded-md mx-4 mb-4">
            <pre className="whitespace-pre-wrap break-words">
              idk, I just got here
            </pre>
          </div>
        </div>
      </dialog>
    </>
  );
}
