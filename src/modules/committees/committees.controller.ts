import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateCommitteeDto } from './dto/inbound/create-committee.dto';
import { CommitteesService } from './committees.service';
import { UpdateCommitteeDto } from './dto/inbound/update-committee.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CommitteeDto } from './dto/outbound/committee.dto';
import { SingleCommitteeResponse } from './swagger-responses/single-committee';
import { MultipleCommitteeResponse } from './swagger-responses/multiple-committees';
import { IdDto } from 'src/dto/id.dto';
import { SeasonDto } from '../../dto/season.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Committees')
@Controller('committees')
@Serialize(CommitteeDto)
export class CommitteesController {
    constructor(private committeesService: CommitteesService) {}

    @Post()
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: 'Committee created successfully',
        type: SingleCommitteeResponse,
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    async createCommittee(@Body() committee: CreateCommitteeDto) {
        return await this.committeesService.createCommittee(committee);
    }

    @Get('/:id')
    @Public()
    @ApiOkResponse({
        description: 'Committee found and returned',
        type: MultipleCommitteeResponse,
    })
    @ApiNotFoundResponse({
        description: 'Committee with provided id not found',
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    async getCommittee(@Param() { id }: IdDto) {
        return await this.committeesService.getCommittees(id);
    }

    @Get('/')
    @Public()
    @ApiOkResponse({
        description: 'Committees found and returned',
        type: MultipleCommitteeResponse,
    })
    async getCommittees(@Query() { season }: SeasonDto) {
        return await this.committeesService.getCommittees(null, season);
    }

    @Patch('/:id')
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Committee updated successfully',
        type: SingleCommitteeResponse,
    })
    @ApiBadRequestResponse({ description: 'Invalid id provided' })
    async updateCommittee(
        @Param() { id }: IdDto,
        @Body() update: UpdateCommitteeDto,
    ) {
        return await this.committeesService.updateCommittee(id, update);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Committee deleted successfully',
        type: SingleCommitteeResponse,
    })
    @ApiBadRequestResponse({ description: 'Invalid id provided' })
    async deleteCommittee(@Param() { id }: IdDto) {
        return await this.committeesService.deleteCommittee(id);
    }
}
