import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { CommitteesModule } from './committees/committees.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
    imports: [
        UsersModule,
        WorkshopsModule,
        CommitteesModule,
        ApplicantsModule,
        ParticipantsModule,
        MongooseModule.forRoot(process.env.DB_URL),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
