import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { GenericResponse } from 'src/dto/generic-response.dto';

/**
 * Interceptor to transform all data returned from all
 * controller across the app into the form of GenericResponse.
 */
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, GenericResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<GenericResponse<T>> {
        return next.handle().pipe(map((data: T) => ({ data })));
    }
}
