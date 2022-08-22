import { CustomSanitizer } from "express-validator";

//this will try to parse  the string and return the result. if parsing failed, do nothing. 
export const JSONParseSanitizer: CustomSanitizer = jsonString => {
    try{
        return JSON.parse(jsonString);
    } catch(err){
        return jsonString;
    }
};
export const toDateSanitizer: CustomSanitizer = datestring => new Date(datestring);
export const toNumberSanitizer: CustomSanitizer = input => Number(input);