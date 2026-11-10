import {statuses, departments, countries} from "../data/additionalData"
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