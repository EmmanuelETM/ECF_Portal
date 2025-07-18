import { Send } from "lucide-react";

export function DialogForm({ handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2"
    >
      <textarea
        autoFocus={true}
        name="MotivoRechazo"
        id="MotivoRechazo"
        className="w-full p-2 border rounded-lg"
      />
      <button
        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 rounded-lg"
        type="submit"
      >
        <Send />
        Enviar
      </button>
    </form>
  );
}
