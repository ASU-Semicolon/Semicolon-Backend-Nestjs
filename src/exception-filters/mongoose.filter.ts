import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
    private logger = new Logger('MongoExceptionFilter');

    async catch(
        exception: mongoose.mongo.MongoServerError,
        host: ArgumentsHost,
    ) {
        const response = host.switchToHttp().getResponse<Response>();

        switch (exception.code) {
            // Duplicate exception
            case 11000: {
                this.logger.debug('Duplication error in mongodb');
                const duplicatedValues =
                    exception?.errorResponse?.keyValue ?? {};

                const message = Object.keys(duplicatedValues).map(
                    (key) =>
                        `${key} with value ${duplicatedValues[key]} is already in use.`,
                );
                response.status(400).json({
                    message,
                });
            }
        }
    }
}
