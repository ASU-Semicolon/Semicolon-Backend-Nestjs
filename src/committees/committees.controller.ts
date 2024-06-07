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

@ApiTags('Committees')
@Controller('committees')
export class CommitteesController {
    constructor(private committeesService: CommitteesService) {}

    @Post()
    @ApiCreatedResponse({ description: 'Committee created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    async createCommittee(@Body() committee: CreateCommitteeDto) {
        return await this.committeesService.createCommittee(committee);
    }

    @Get('/:id')
    @ApiOkResponse({ description: 'Committee found and returned' })
    @ApiNotFoundResponse({
        description: 'Committee with provided id not found',
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    async getCommittee(@Param('id') targetCommitteeId: string) {
        return await this.committeesService.getCommittees(targetCommitteeId);
    }

    @Get('/')
    @ApiOkResponse({ description: 'Committees found and returned' })
    async getCommittees(@Query('year') year: string) {
        return await this.committeesService.getCommittees(null, year);
    }

    @Patch('/:id')
    @ApiOkResponse({ description: 'Committee updated successfully' })
    @ApiBadRequestResponse({ description: 'Invalid id provided' })
    async updateCommittee(
        @Param('id') targetCommitteeId: string,
        @Body() update: UpdateCommitteeDto,
    ) {
        return await this.committeesService.updateCommittee(
            targetCommitteeId,
            update,
        );
    }

    @Delete('/:id')
    @ApiOkResponse({ description: 'Committee deleted successfully' })
    @ApiBadRequestResponse({ description: 'Invalid id provided' })
    async deleteCommittee(@Param('id') targetCommitteeId: string) {
        return await this.committeesService.deleteCommittee(targetCommitteeId);
    }
}
