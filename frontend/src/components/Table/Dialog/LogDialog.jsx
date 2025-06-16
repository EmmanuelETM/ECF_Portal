import { useRef } from "react";
import { FileChartColumn, X } from "lucide-react";

export function LogDialog() {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        className="cursor-pointer p-2 rounded-lg text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-black"
        onClick={openDialog}
      >
        <FileChartColumn />
      </button>

      <dialog
        ref={dialogRef}
        className="rounded-lg p-6 w-[60%] h-[70%] max-w-full max-h-full backdrop:backdrop-blur-sm border fixed inset-0 m-auto"
        onClose={closeDialog}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">XML Dialog</h2>
            <button
              className="text-gray-500 hover:text-black"
              onClick={closeDialog}
            >
              <X />
            </button>
          </div>
          <div className="w-full h-full bg-stone-300 border border-stone-500 rounded-lg overflow-auto">
            idk, i just got here
          </div>
        </div>
      </dialog>
    </>
  );
}
