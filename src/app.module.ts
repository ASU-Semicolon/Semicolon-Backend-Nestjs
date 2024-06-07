import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { CommitteesModule } from './committees/committees.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [UsersModule, WorkshopsModule, CommitteesModule, ApplicantsModule, ParticipantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
