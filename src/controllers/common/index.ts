import { NextFunction, Request, Response } from 'express';
import { Model, Types } from 'mongoose';

export const createController =
  <IModel extends Model<any>>(ModelCreate: IModel) =>
  (req: Request, res: Response, next: NextFunction) => {
    const model = new ModelCreate({
      _id: new Types.ObjectId(),
      ...req.body,
    });
    Promise.resolve().catch((err) => next(err));
  };
