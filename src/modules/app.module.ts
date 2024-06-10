import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { CommitteesModule } from './committees/committees.module';
import { CandidatesModule } from './candidates/candidates.module';
import { APP_FILTER } from '@nestjs/core';
import { MongoExceptionFilter } from 'src/exception-filters/mongoose.filter';

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
    ],
})
export class AppModule {}
