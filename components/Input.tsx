"use client";
export function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? ""}
        required={required}
        className="mt-1 block w-full rounded border p-2"
      />
    </div>
  );
}