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
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { WorkshopsService } from './workshops.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { WorkshopDto } from './dto/outbound/workshop.dto';
import { CreateWorkshopDto } from './dto/inbound/create-workshop.dto';
import { SingleWorkshopResponse } from './swagger-responses/single-workshop';
import { IdDto } from 'src/dto/id.dto';
import { MultipleCandidateResponse } from '../candidates/swagger-responses/multiple-candidate';
import { SeasonDto } from 'src/dto/season.dto';
import { UpdateWorkshopDto } from './dto/inbound/update-workshop.dto';
import { MultipleWorkshopResponse } from './swagger-responses/multiple-workshop';
import { Public } from 'src/decorators/public.decorator';

@Serialize(WorkshopDto)
@ApiTags('Workshops')
@Controller('workshops')
export class WorkshopsController {
    constructor(private workshopsService: WorkshopsService) {}

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new workshop' })
    @ApiCreatedResponse({
        description: 'The workshop has been successfully created',
        type: SingleWorkshopResponse,
    })
    async createWorkshop(@Body() workshop: CreateWorkshopDto) {
        return this.workshopsService.createWorkshop(workshop);
    }

    @Get('/:id')
    @Public()
    @ApiOperation({ summary: 'Get a workshop by id' })
    @ApiOkResponse({
        description: 'The workshop has been successfully found',
        type: MultipleWorkshopResponse,
    })
    async getWorkshop(@Param() { id }: IdDto) {
        return this.workshopsService.getWorkshops(id);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Get all workshops filtered by season' })
    @ApiOkResponse({
        description: 'The workshops have been successfully found',
        type: MultipleWorkshopResponse,
    })
    async getWorkshops(@Query() { season }: SeasonDto) {
        return this.workshopsService.getWorkshops(null, season);
    }

    @Patch('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a workshop by id' })
    @ApiOkResponse({
        description: 'The workshop has been successfully updated',
        type: SingleWorkshopResponse,
    })
    async updateWorkshop(
        @Param() { id }: IdDto,
        @Body() update: UpdateWorkshopDto,
    ) {
        return this.workshopsService.updateWorkshop(id, update);
    }

    @Delete('/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a workshop by id' })
    @ApiOkResponse({
        description: 'The workshop has been successfully deleted',
        type: SingleWorkshopResponse,
    })
    async deleteWorkshop(@Param() { id }: IdDto) {
        return this.workshopsService.deleteWorkshop(id);
    }
}
