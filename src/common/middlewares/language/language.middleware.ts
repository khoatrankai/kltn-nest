import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Language } from 'src/common/enum';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response , next: NextFunction): Response<any, Record<string, any>> | void {

    const lang: string = req.query['lang']?.toString() || Language.VI;
  
    // Return error if lang is not supported in Language enum
    if (!Object.values(Language).includes(lang as Language)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Language is not supported',
        data: null,
        request: {
          api: req.originalUrl,
          method: req.method
        }
      })
    }
    else {
      // Set lang to request
      req.lang = lang as Language;
      // Remove lang from query
      delete req.query['lang'];
      next();
    }
  }
}
