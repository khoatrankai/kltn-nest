import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { LanguageType } from "../entities/language-type.entity";
import { LanguageTypeSerialization } from "../serialization/language-types.serializaion";

export class LanguageTypesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map(
          (languageType: LanguageType[]) => {
            const lang = _context.switchToHttp().getRequest().lang;
            return {
              status: _context.switchToHttp().getResponse().statusCode,
              data: {
                languageTypes: languageType.map((languageType) =>
                  Object.assign(
                    new LanguageTypeSerialization(languageType, lang),
                  ),
                ),
              },
  
              message: _context.switchToHttp().getResponse().statusMessage,
            };
          },
        ),
      );
    }
  }
  