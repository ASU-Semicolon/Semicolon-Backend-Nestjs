import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { CommitteesModule } from './committees/committees.module';
import { CandidatesModule } from './candidates/candidates.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongoExceptionFilter } from 'src/exception-filters/mongoose.filter';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@Module({
    imports: [
        UsersModule,
        WorkshopsModule,
        CommitteesModule,
        CandidatesModule,
        MongooseModule.forRoot(process.env.DB_URL),
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: MongoExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
