import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { UsersService } from 'src/modules/users/users.service';
import { JWTPayload } from 'src/types/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {
    private logger = new Logger('AuthGuard');
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Check if the route is public
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isPublic) {
            this.logger.debug('Route is public');
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        this.logger.debug(`Token: ${token}`);
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }
        try {
            // Extract the user Id from the token
            const { userId }: JWTPayload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                },
            );
            this.logger.debug(`User Id inside the token: ${userId}`);

            // Get the user from the database
            const [user] = await this.usersService.getUsers({ _id: userId });
            if (!user) {
                throw new UnauthorizedException(
                    "User provided in the token doesn't exist",
                );
            }
            this.logger.debug(`User found!`);

            // Attach the user to the request object
            request['user'] = user;
            return true;
        } catch (error) {
            this.logger.error(error.message);
            throw new UnauthorizedException(error.message);
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
