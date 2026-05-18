interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function SearchBarProps({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-xl bg-white"
    />
  );
}
