import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { LevelType } from "../entities/level-types.entity";
import { LevelTypeSerialization } from "../serialization/level-types.seriazalion";


export class LevelTypesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map(
          (levelType: LevelType[]) => {
            const lang = _context.switchToHttp().getRequest().lang;
            return {
              status: _context.switchToHttp().getResponse().statusCode,
              data: {
                levelTypes: levelType.map((levelType) =>
                  Object.assign(
                    new LevelTypeSerialization(levelType, lang),
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
  