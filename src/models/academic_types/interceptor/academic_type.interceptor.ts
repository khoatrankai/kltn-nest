import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { AcademicType } from "../entities/academic_type.entity";
import { AcedemicTypesSerialization } from "../serialization/acedemic_types.serialization";


export class AcademicTypesInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((academic: any) => {

          const lang = _context.switchToHttp().getRequest().lang;
          const data = academic?.data?.map((data: AcademicType) => {
            const academicSerialization = new AcedemicTypesSerialization(
                data,
              lang,
            );
            return academicSerialization;
          });
  
          return {
            status: _context.switchToHttp().getResponse().statusCode,
            data,
            message: _context.switchToHttp().getResponse().statusMessage,
          };
        }),
      );
    }
  }
  