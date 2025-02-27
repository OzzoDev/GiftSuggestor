import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  placeholder?: string;
  onChange: (query: string) => void;
}

export default function Searchbar({ placeholder = "Search", onChange }: SearchBarProps) {
  return (
    <div className="flex gap-4 p-1 border-b-[1px] border-gray-400">
      <IoIosSearch size={24} color="white" />
      <input
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        onChange={(e) => onChange(e.target.value.trim().toLowerCase())}
        className="w-full border-0 outline-none text-white bg-transparent placeholder-gray-400"
      />
    </div>
  );
}
