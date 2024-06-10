import { Module } from '@nestjs/common';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateSchema } from './candidates.schema';

@Module({
    controllers: [CandidatesController],
    providers: [CandidatesService],
    imports: [
        MongooseModule.forFeature([
            { name: 'Candidate', schema: CandidateSchema },
        ]),
    ],
})
export class CandidatesModule {}
