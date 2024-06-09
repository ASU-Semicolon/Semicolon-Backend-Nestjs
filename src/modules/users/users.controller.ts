import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Query,
    Patch,
    Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponseOptions,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({ description: 'User created successfully' })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    @ApiUnauthorizedResponse({
        description: 'Must be an admin to access this resource',
    })
    @ApiInternalServerErrorResponse({
        description: 'Error happened inside the server',
    })
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

    @Get('/:id')
    @ApiOkResponse({ description: 'User found and returned successfully' })
    @ApiNotFoundResponse({ description: 'User not found' })
    getUser(@Param('id') targetUserId: string) {
        return this.usersService.getUsers(targetUserId);
    }

    @Get()
    @ApiOkResponse({
        description: 'Users list found and returned successfully',
    })
    getAllUsers(@Query('year') year: string) {
        return this.usersService.getUsers(null, year);
    }

    @Patch('/:id')
    @ApiOkResponse({
        description: 'User updated successfully',
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    updateUser(
        @Param('id') targetUserId: string,
        @Body() update: UpdateUserDto,
    ) {
        return this.usersService.updateUser(targetUserId, update);
    }

    @Delete('/:id')
    @ApiOkResponse({
        description: 'User deleted successfully',
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    deleteUser(@Param('id') targetUserId: string) {
        return this.deleteUser(targetUserId);
    }
}
const a: ApiResponseOptions = {};
