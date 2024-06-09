import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export const Serialize = (dto: ClassConstructor<any>) => {
    return UseInterceptors(new SerializeInterceptor(dto));
};

/**
 * Interceptor to serialize the returned data to the user
 * based on the passed dto.
 */

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor<any>) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ClassConstructor<any>> {
        return next.handle().pipe(
            map((data) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
