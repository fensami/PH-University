/*eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/HandleZodError';
import handleValidationError from '../errors/HandleValidationError';
import handleCastError from '../errors/HandleCastError';
import handleDuplicateError from '../errors/HandleDuplicateError';
import { TErrorSources } from '../interface/error';
import AppError from '../errors/AappErrors';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // Set Default Values
    let statusCode = 500;
    let message = "Something went wrong";


    let errorSources: TErrorSources = [{
        path: '',
        message: 'Something went wrong'
    }]

    if (err instanceof ZodError) {
        const simgplifiedError = handleZodError(err)
        statusCode = simgplifiedError?.statusCode;
        message = simgplifiedError?.message;
        errorSources = simgplifiedError?.errorSources;
        // message: "ami zod error"
        // console.log(simgplifiedError);

    } else if (err?.name === "ValidationError") {
        const simgplifiedError = handleValidationError(err);
        statusCode = simgplifiedError?.statusCode;
        message = simgplifiedError?.message;
        errorSources = simgplifiedError?.errorSources
        console.log(simgplifiedError);
    } else if (err?.name === "CastError") {
        const simgplifiedError = handleCastError(err);
        statusCode = simgplifiedError?.statusCode;
        message = simgplifiedError?.message;
        errorSources = simgplifiedError?.errorSources;
        // console.log(simgplifiedError);
    } else if (err?.code === 11000) {
        const simgplifiedError = handleDuplicateError(err);
        statusCode = simgplifiedError?.statusCode;
        message = simgplifiedError?.message;
        errorSources = simgplifiedError?.errorSources;
        // console.log(simgplifiedError);
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]

    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [{
            path: '',
            message: err?.message
        }]

    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        // err,
        stack: config.NODE_ENV === "development" ? err?.stack : null
    })

}
export default globalErrorHandler;


/*
success
message
ErrorSources: [
path: '/',
message: ""
]
stack
*/