import { Module } from '@nestjs/common';
import { CommitteesController } from './committees.controller';
import { CommitteesService } from './committees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitteeSchema } from './committees.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Committee', schema: CommitteeSchema },
        ]),
    ],
    controllers: [CommitteesController],
    providers: [CommitteesService],
})
export class CommitteesModule {}
