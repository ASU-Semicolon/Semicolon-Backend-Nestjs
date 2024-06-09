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
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { CommitteesService } from './committees.service';
import { UpdateCommitteeDto } from './dto/update-committee.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CommitteeDto } from './dto/committee.dto';
import { SingleCommitteeResponse } from './swagger-examples/single-committee';
import { MultipleCommitteeResponse } from './swagger-examples/multiple-committees';
import { IdDto } from 'src/dto/id.dto';
import { YearFilterDto } from '../../dto/year-filter.dto';

@ApiTags('Committees')
@Controller('committees')
@Serialize(CommitteeDto)
export class CommitteesController {
    constructor(private committeesService: CommitteesService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Committee created successfully',
        type: SingleCommitteeResponse,
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    async createCommittee(@Body() committee: CreateCommitteeDto) {
        return await this.committeesService.createCommittee(committee);
    }

    @Get('/:id')
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
    @ApiOkResponse({
        description: 'Committees found and returned',
        type: MultipleCommitteeResponse,
    })
    async getCommittees(@Query() { year }: YearFilterDto) {
        return await this.committeesService.getCommittees(null, year);
    }

    @Patch('/:id')
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
    @ApiOkResponse({
        description: 'Committee deleted successfully',
        type: SingleCommitteeResponse,
    })
    @ApiBadRequestResponse({ description: 'Invalid id provided' })
    async deleteCommittee(@Param() { id }: IdDto) {
        return await this.committeesService.deleteCommittee(id);
    }
}
