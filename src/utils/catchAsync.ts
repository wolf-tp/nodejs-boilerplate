import { NextFunction, Request, Response } from 'express';

export const catchAsync = (fnModel: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fnModel(req, res, next)).catch((err) => next(err));
};
