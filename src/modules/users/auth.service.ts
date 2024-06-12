import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInDto } from './dto/inbound/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import User from './types/user';
import { JWTPayload } from 'src/types/jwt-payload';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async singIn({
        phone,
        password,
    }: SignInDto): Promise<{ user: User; token: string }> {
        const [user] = await this.usersService.getUsers({ phone });

        if (!user) {
            throw new UnauthorizedException('Invalid phone number');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload: JWTPayload = { userId: user._id.toString() };
        const response = {
            user,
            token: await this.jwtService.signAsync(payload),
        };

        this.logger.debug(response);
        return response;
    }
}
