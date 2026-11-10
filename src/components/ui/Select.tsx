
import type { ISelectProps } from "../../types/select";

function Select({
    label,
    options,
    placeholder = "Select an option",
    isModal,
    ...props
}: ISelectProps) {
    return (
        <div
            className={`flex flex-col gap-2 ${
                isModal ? "w-2xs" : "w-lg"
            }`}
        >
            <label>{label}</label>

            <select
                {...props}
                className={`border rounded-md px-4 h-12 ${
                    isModal ? "w-2xs" : "w-full"
                }`}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option key={option.name} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
