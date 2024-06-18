import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

export class UnlockMiddleware implements NestMiddleware {
  use(
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ): Response<any, Record<string, any>> | void {
    const unlock: string = req.query['unlock']?.toString() || 'false';

    if (unlock !== 'true' && unlock !== 'false') {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Unlock is not supported',
        data: null,
        request: {
          api: req.originalUrl,
          method: req.method,
        },
      });
    } else {
      // Set lang to request
      req.unlock = unlock;
      // Remove lang from query
      delete req.query['unlock'];

      next();
    }
  }
}
