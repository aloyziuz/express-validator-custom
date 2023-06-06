# Express Validator Custom
This package provides additional sanitizer and validator functions to `express-validator` package. 

## Installation
```
npm install `@aloysius-software-factory/custom-express-validator`
```

### Custom Sanitizers
- JSONParseSanitizer function will apply JSON.parse function to the request value. 
- toDateSanitizer function will convert datetime string value to javascript Date object. 
- toNumberSanitizer function will convert string value to number (invalid numeric string will result in NaN). 

### Custom Validators
- NonEmptyStringValidator will check that a string is not an empty string, null, or undefined. 
- ValidDateValidator will check that a date object is not invalid. 
- ValidNumberValidator will check that a number is not NaN. 
- NonNegativeNumberValidator will check that a number is >= 0
- MoreThanZeroValidator will check that a number is > 0
- GetNumberRangeValidator(a, b) is a function that will return a validator function that checks the input number `N` satisfies the following constraint `a <= N <= b`.

### Example Usage
```
body('discount')
  .customSanitizer(toNumberSanitizer)
  .custom(GetNumberRangeValidator(0, 100))
  .withMessage('diskon invalid') 
```

`body('discount')` will extract a value at req.body.discount. 

`.customSanitizer(toNumberSanitizer)` will apply `Number()` conversion function to the value and convert it to number (NaN if value is not a valid number). 

`.custom(GetNumberRangeValidator(0, 100))` will check that the number is between 0 - 100 inclusive. 

`.withMessage('diskon invalid')` will return error response with string `diskon invalid` if the value fails in the validator. 
