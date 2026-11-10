import type { ITextareaProps } from "../../types/textarea";

function Textarea({
  label,
  placeholder = "Enter text...",
  isModal,
  ...props
}: ITextareaProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${
        isModal ? "w-2xs" : "w-lg"
      }`}
    >
      <label>{label}</label>

      <textarea
        {...props}
        placeholder={placeholder}
        className={`border rounded-md px-4 py-3 h-12 resize-none overflow-hidden ${
          isModal ? "w-2xs" : "w-full"
        }`}
      />
    </div>
  );
}

export default Textarea;