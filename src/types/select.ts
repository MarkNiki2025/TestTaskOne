export interface ISelectOption {
  name: string;
  value: string;
}

export interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: ISelectOption[];
  error?: string;
  placeholder?: string;
}