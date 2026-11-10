import type {ISelectOption} from "../types/select"
export const getUniqueOptions = (options: ISelectOption[]): ISelectOption[] => {
        return [...new Map(options.map((option) => [option.value, option])).values()];
};