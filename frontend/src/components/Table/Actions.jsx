import { FileChartColumn, ReceiptText, Send } from "lucide-react";

export function Actions() {
  return (
    <div className="flex gap-1 items-center justify-between">
      <button className="cursor-pointer p-2 rounded-lg text-green-600 border border-green-600 hover:bg-green-600 hover:text-white">
        <ReceiptText />
      </button>
      <button className="cursor-pointer p-2 rounded-lg text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white">
        <Send />
      </button>
      <button className="cursor-pointer p-2 rounded-lg text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-black">
        <FileChartColumn />
      </button>
    </div>
  );
}
