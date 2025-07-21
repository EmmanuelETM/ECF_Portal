import { Switch } from "./Switch";

export function Setting({ title, description, enabled, onToggle }) {
  return (
    <div className="w-full max-w-5xl flex items-center justify-between gap-4 border-b py-2 border-gray-400 my-6 text-base font-medium">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-sm text-gray-600 font-light">{description}</p>
      </div>
      <div>
        <Switch enabled={enabled} onToggle={onToggle} />
      </div>
    </div>
  );
}
