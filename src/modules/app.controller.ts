import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConstantDto } from 'src/dto/constant.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiTags('Constants')
    @ApiOperation({ summary: 'Get a list of requested constants.' })
    @ApiOkResponse({
        description: 'The list of constants.',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'string',
                        example: 'web development',
                    },
                },
            },
        },
    })
    @Get('constants')
    @Public()
    getConstants(@Query() { type }: ConstantDto) {
        switch (type) {
            case 'sectors':
                return this.appService.getSectors();
            case 'events':
                return this.appService.getEvents();
            case 'workshop-states':
                return this.appService.getWorkshopStates();
            case 'academic-years':
                return this.appService.getAcademicYears();
            case 'candidate-status':
                return this.appService.getCandidateStatuses();
            default:
                return [];
        }
    }
}
