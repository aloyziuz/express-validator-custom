import { validationResult, ValidationChain, ValidationError, Result } from "express-validator";
import { NextFunction, Response, Request } from "express";

// sequential processing, stops running validations chain if the previous one have failed.
export const validate = (
    validations: ValidationChain[], 
    OnValidationError?: (err: Result<ValidationError>, req: Request) => void
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) 
                break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        if(OnValidationError)
            OnValidationError(errors, req);
        
        //get last error
        let err = errors.array().slice(-1)[0];
        if(err.nestedErrors){
            //get last inner error if available
            const innerErr =  err.nestedErrors.slice(-1)[0] as ValidationError;
            res.status(400).send(innerErr.msg);
        }
        else
            res.status(400).send(err.msg);
    };
};
