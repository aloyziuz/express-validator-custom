import { CustomValidator } from "express-validator";
import { IsNonEmptyString, IsValidDate, IsValidNumber } from "@aloysius-software-factory/type-checker";

export const NonEmptyStringValidator: CustomValidator = stringValue => IsNonEmptyString(stringValue);
export const ValidDateValidator: CustomValidator = date => IsValidDate(date);
export const ValidNumberValidator: CustomValidator = input => IsValidNumber(input);
export const NonNegativeNumberValidator: CustomValidator = num => {
    const res = Number(num);
    if(Number.isNaN(res) || res < 0){
        return false;
    }
    return true;
};
export const MoreThanZeroValidator: CustomValidator = num => {
    const res = Number(num);
    if(Number.isNaN(res) || res < 1)
        return false;
    return true;
};
export const GetNumberRangeValidator: (lower: number, upper: number) => CustomValidator = 
    (lower: number, upper: number) => {
        return (value) => value >= lower && value <= upper;
    };
