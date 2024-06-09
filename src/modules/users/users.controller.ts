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
import { CreateUserDto } from './dto/inbound/create-user.dto';
import { UsersService } from './users.service';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponseOptions,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/inbound/update-user.dto';
import { IdDto } from 'src/dto/id.dto';
import { YearFilterDto } from 'src/dto/year-filter.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/outbound/user.dto';
import { SingleUserResponse } from './swagger-responses/single-user';
import { MultipleUserResponse } from './swagger-responses/multiple-user';

@Serialize(UserDto)
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'User created successfully',
        type: SingleUserResponse,
    })
    @ApiBadRequestResponse({ description: 'Invalid data provided' })
    @ApiUnauthorizedResponse({
        description: 'Must be an admin to access this resource',
    })
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'User found and returned successfully',
        type: MultipleUserResponse,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    getUser(@Param() { id }: IdDto) {
        return this.usersService.getUsers(id);
    }

    @Get()
    @ApiOkResponse({
        description: 'Users list found and returned successfully',
        type: MultipleUserResponse,
    })
    getAllUsers(@Query() { year }: YearFilterDto) {
        return this.usersService.getUsers(null, year);
    }

    @Patch('/:id')
    @ApiOkResponse({
        description: 'User updated successfully',
        type: SingleUserResponse,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    updateUser(@Param() { id }: IdDto, @Body() update: UpdateUserDto) {
        return this.usersService.updateUser(id, update);
    }

    @Delete('/:id')
    @ApiOkResponse({
        description: 'User deleted successfully',
        type: SingleUserResponse,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    deleteUser(@Param() { id }: IdDto) {
        return this.usersService.deleteUser(id);
    }
}
const a: ApiResponseOptions = {};
