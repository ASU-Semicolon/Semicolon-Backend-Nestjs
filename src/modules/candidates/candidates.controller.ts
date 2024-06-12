import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/inbound/create-candidate.dto';
import { CandidateDto } from './dto/outbound/candidate.dto';
import { SingleCandidateResponse } from './swagger-responses/single-candidate';
import { IdDto } from 'src/dto/id.dto';
import { CandidateFilterDto } from './dto/inbound/candidate-filter.dto';
import { MultipleCandidateResponse } from './swagger-responses/multiple-candidate';
import { UpdateCandidateDto } from './dto/inbound/update-candidate.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Public } from 'src/decorators/public.decorator';

@Serialize(CandidateDto)
@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
    constructor(private candidatesService: CandidatesService) {}

    @Post()
    @Public()
    @ApiCreatedResponse({
        description: 'The candidate has been successfully created.',
        type: SingleCandidateResponse,
    })
    @ApiBadRequestResponse({
        description: 'Bad Request. Invalid data provided.',
    })
    async createCandidate(@Body() candidate: CreateCandidateDto) {
        return await this.candidatesService.createCandidate(candidate);
    }

    @Get()
    @ApiOkResponse({
        description: 'The candidates have been successfully retrieved.',
        type: MultipleCandidateResponse,
    })
    @ApiBearerAuth()
    async getCandidates(@Query() { event, type }: CandidateFilterDto) {
        return await this.candidatesService.getCandidates(type, null, event);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'The candidate has been successfully retrieved.',
        type: SingleCandidateResponse,
    })
    @ApiBearerAuth()
    async getCandidate(@Param() { id }: IdDto) {
        return await this.candidatesService.getCandidates(null, id);
    }

    @Patch('/:id')
    @ApiOkResponse({
        description: 'The candidate has been successfully updated.',
        type: SingleCandidateResponse,
    })
    @ApiBearerAuth()
    async updateCandidate(
        @Param() { id }: IdDto,
        @Body() update: UpdateCandidateDto,
    ) {
        return await this.candidatesService.updateCandidate(id, update);
    }

    @Delete('/:id')
    @ApiOkResponse({
        description: 'The candidate has been successfully deleted.',
        type: SingleCandidateResponse,
    })
    @ApiBearerAuth()
    async deleteCandidate(@Param() { id }: IdDto) {
        return await this.candidatesService.deleteCandidate(id);
    }
}
