import { Injectable } from '@nestjs/common';
import { Enums } from 'src/types/enums';

@Injectable()
export class AppService {
    getSectors(): string[] {
        return Object.values(Enums.Sector);
    }

    getEvents(): string[] {
        return Object.values(Enums.Event);
    }

    getWorkshopStates(): string[] {
        return Object.values(Enums.WorkshopState);
    }

    getAcademicYears(): string[] {
        return Object.values(Enums.AcademicYear);
    }
}
