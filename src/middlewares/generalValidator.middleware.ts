import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ResponseHandler } from '../helpers/responseHandler.helper';

export class GeneralValidator {
  /**
   * @description creates a actual data against schema
   * @param  {object} data http request object to validate
   * @param {object} schema joi schema to compare with actual data for validation
   * @param  {object} res The http response object
   * @param  {function} next The function which allow us to go to next middleware
   * @returns {any} The http response object
   */
  static validator(
    req: Request,
    res: Response,
    next: NextFunction,
    schema: Joi.AnySchema,
  ) {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = this.joiErrorHandler(error.details);
      return ResponseHandler.sendErrorResponse(res, {
        statusCode: 400,
        message,
      });
    }

    next();
  }

  /**
   * @description This works as veridation wrapper
   * @param  {object} req The HTTP request sent
   * @param  {object} res The HTTP responds object
   * @param  {function} next The next middleware
   * @return {any} Will take the schema to validate body against.
   */
  static validationHandler = (schemas: Joi.AnySchema) => (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    GeneralValidator.validator(req, res, next, schemas);
  };

  /**
   * @description creates a actual data against schema
   * @param  {any} errorDetails error object returned by join
   * @returns {any} The http response object
   */
  static joiErrorHandler(errorDetails: any) {
    var errorMessage: string;
    errorDetails.forEach(
      ({ message, type, context, context: { label } }: any) => {
        switch (type) {
          case 'any.required':
            errorMessage = `${label} is required.`;
            break;
          case 'any.allowOnly':
            errorMessage = `only ${context.valids} are allowed.`;
            break;
          case 'number.base':
            errorMessage = `${label} should be a number.`;
            break;
          case 'number.min':
            errorMessage = `${label} should not be less than ${context.limit}.`;
            break;
          case 'number.max':
            errorMessage = `${label} should not be greater than ${context.limit}.`;
            break;
          case 'string.email':
            errorMessage = 'please provide a valid email address.';
            break;
          case 'string.regex.base':
            errorMessage = `please provide a valid ${label}.`;
            break;
          default:
            errorMessage = `${message.replace(/\\|(")/g, '')}.`;
        }
      },
    );

    return errorMessage;
  }
}
