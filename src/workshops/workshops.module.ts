import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { WorkshopsController } from './workshops.controller';

@Module({
  controllers: [ServiceController, WorkshopsController],
})
export class WorkshopsModule {}
