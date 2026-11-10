const countries = [
  { name: "Ukraine", value: "UA" },
  { name: "United States", value: "US" },
  { name: "Canada", value: "CA" },
  { name: "Germany", value: "DE" },
  { name: "France", value: "FR" },
  { name: "Australia", value: "AU" },
  { name: "Japan", value: "JP" },
  { name: "United Kingdom", value: "GB" },
  { name: "China", value: "CN" },
  { name: "India", value: "IN" },
] as const;

const departments = [
  { name: "Human Resources", value: "HR" },
  { name: "Finance", value: "FIN" },
  { name: "Information Technology", value: "IT" },
  { name: "Marketing", value: "MKT" },
  { name: "Sales", value: "SAL" },
  { name: "Customer Support", value: "CS" },
  { name: "Research and Development", value: "R&D" },
  { name: "Operations", value: "OPS" },
  { name: "Legal", value: "LEG" },
  { name: "Product Management", value: "PM" },
] as const;

const statuses = [
  { name: "All statuses", value: "ALL" },
  { name: "Active", value: "ACTIVE" },
  { name: "Disabled", value: "DISABLED" },
] as const;

// Types
export type Status = typeof statuses[number];
export type Department = typeof departments[number];
export type Country = typeof countries[number];

export interface IUser {
  name: string;
  status: Status;
  department: Department;
  country: Country;
}