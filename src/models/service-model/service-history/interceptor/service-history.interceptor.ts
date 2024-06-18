import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ServiceHistorySerialization } from '../serialization/service-history.serialization';
import { ServiceHistory } from '../entities/service-history.entity';

export class AllServiceHistoryInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((serviceHistory: ServiceHistory[]) => {
                // lang
                const lang = _context.switchToHttp().getRequest().query.lang;

                const data = serviceHistory.map((serviceHistory: ServiceHistory) => {
                    const serviceHistorySerialization = new ServiceHistorySerialization(
                        serviceHistory,
                        lang,
                    );
                    return serviceHistorySerialization;
                });

                return {
                    status: _context.switchToHttp().getResponse().statusCode,
                    data: data,
                    message: _context.switchToHttp().getResponse().statusMessage,
                };
            }),
        );
    }
}
