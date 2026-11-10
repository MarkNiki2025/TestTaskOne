import type { ISelectOption } from "./select";

export interface IMultiSelectProps {
  label: string;
  options: ISelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
}