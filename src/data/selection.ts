import {users} from "./users"
import type {ISelectOption} from "../types/select"
import { getUniqueOptions } from "../utility/utility";
export const userSelectCountry: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.country.name,
        value: user.country.value,
    }))
    );

export const userSelectDepartment: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.department.name,
        value: user.department.value,
    }))
    );

export const userSelectStatus: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.status.name,
        value: user.status.value,
    }))
    );
export const userSelect: ISelectOption[] = getUniqueOptions(
        users.map((user) => ({
            name: user.name,
            value: user.name,
        }))
    );
