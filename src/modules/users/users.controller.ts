import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Query,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/inbound/create-user.dto';
import { UsersService } from './users.service';
import {
    ApiBadRequestResponse,
    ApiBasicAuth,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/inbound/update-user.dto';
import { IdDto } from 'src/dto/id.dto';
import { SeasonDto } from 'src/dto/season.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/outbound/user.dto';
import { SingleUserResponse } from './swagger-responses/single-user';
import { MultipleUserResponse } from './swagger-responses/multiple-user';
import { SignInDto } from './dto/inbound/signIn.dto';
import { AuthService } from './auth.service';
import { SignInResultDto } from './dto/outbound/signIn-result.dto';
import { SignInResponse } from './swagger-responses/signIn';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @Post()
    @Serialize(UserDto)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBearerAuth()
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
    @Serialize(UserDto)
    @ApiOperation({ summary: 'Get a user by id' })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'User found and returned successfully',
        type: MultipleUserResponse,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    getUser(@Param() { id }: IdDto) {
        return this.usersService.getUsers({ _id: id });
    }

    @Get()
    @Serialize(UserDto)
    @ApiOperation({ summary: 'Get all users filtered by season' })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'Users list found and returned successfully',
        type: MultipleUserResponse,
    })
    getAllUsers(@Query() { season }: SeasonDto) {
        return this.usersService.getUsers(season ? { season } : {});
    }

    @Patch('/:id')
    @Serialize(UserDto)
    @ApiOperation({ summary: 'Update a user by id' })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'User updated successfully',
        type: SingleUserResponse,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    updateUser(@Param() { id }: IdDto, @Body() update: UpdateUserDto) {
        return this.usersService.updateUser(id, update);
    }

    @Delete('/:id')
    @Serialize(UserDto)
    @ApiOperation({ summary: 'Delete a user by id' })
    @ApiBearerAuth()
    @ApiOkResponse({
        description: 'User deleted successfully',
        type: SingleUserResponse,
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    deleteUser(@Param() { id }: IdDto) {
        return this.usersService.deleteUser(id);
    }

    @Post('/signIn')
    @Public()
    @Serialize(SignInResultDto)
    @ApiOperation({ summary: 'Sign in a user' })
    @ApiOkResponse({
        description: 'User signed in successfully',
        type: SignInResponse,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials',
    })
    singIn(@Body() credentials: SignInDto) {
        return this.authService.singIn(credentials);
    }
}
