import { validationResult, ValidationChain, ValidationError } from "express-validator";
import express from "express";

// sequential processing, stops running validations chain if the previous one have failed.
export const validate = (validations: ValidationChain[]) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
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
