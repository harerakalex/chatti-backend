import { Request, Response } from 'express';

export class HomeController {
  static async LoadHomepage(req: Request, res: Response) {
    res.status(200).json({
      status: 200,
      message: 'Welcome to Chatti App.',
    });
  }
}
