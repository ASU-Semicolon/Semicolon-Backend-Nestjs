import { Module } from '@nestjs/common';
import { WorkshopsController } from './workshops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkshopSchema } from './workshops.schame';
import { WorkshopsService } from './workshops.service';

@Module({
    controllers: [WorkshopsController],
    providers: [WorkshopsService],
    imports: [
        MongooseModule.forFeature([
            { name: 'Workshop', schema: WorkshopSchema },
        ]),
    ],
})
export class WorkshopsModule {}
