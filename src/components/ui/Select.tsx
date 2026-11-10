import type { ISelectProps } from "../../types/select"

function Select({
  label,
  options,
  placeholder = "Select an option",
  ...props
}: ISelectProps) {
  return (
    <div className="flex flex-col gap-2 w-lg">
      <label>{label}</label>

      <select {...props} className="border rounded-md px-4 py-3 h-12">
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>

    </div>
  );
}

export default Select;