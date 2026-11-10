
import type { IMultiSelectProps } from "../../types/multyselect";
import { useState } from "react";


function MultiSelect({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select options",
}: IMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(optionValue: string) {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  return (
    <div className="relative flex flex-col gap-2 w-full">
      <label className="font-medium text-sm">{label}</label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center border-2 px-4 py-3 disabled:opacity-50"
      >
        <span>
          {value.length > 0
            ? options
                .filter((option) => value.includes(option.value))
                .map((option) => option.name)
                .join(", ")
            : placeholder}
        </span>

        <span>⌄</span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full border rounded-md bg-white shadow-md">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleSelect(option.value)}
              />

              {option.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
