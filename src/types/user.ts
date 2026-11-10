
const countries = [
  { name: "Ukraine", value: "UA" },
  { name: "United States", value: "US" },
  { name: "Canada", value: "CA" },
]as const;;

const departments = [
  { name: "Human Resources", value: "HR" },
  { name: "Finance", value: "FIN" },
  { name: "Information Technology", value: "IT" },
]as const;;

const statuses  = [
  { name: "All statuses", value: "ALL" },
  { name: "Active", value: "ACTIVE" },
  { name: "Disabled", value: "DISABLED" },
]as const;

export type Status = typeof statuses[number]["value"];
export type Department = typeof departments[number]["value"];
export type Country = typeof countries[number]["value"];

export interface IUser {
    name: string;
    status: Status;
    department: Department;
    country: Country;
}