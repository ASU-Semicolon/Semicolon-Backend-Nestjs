import { Enums } from 'src/types/enums';

export interface Workshop {
    title: string;
    description: string;
    duration_in_sessions: number;
    sessions_per_week: number;
    start_date: Date;
    location: string;
    committee: mongoose.Types.ObjectId;
    state: Enums.WorkshopState;
    instructor: mongoose.Types.ObjectId;
    prerequisites: string[];
    cover_image?: string;
    /**
     * Season in which the workshop was created.
     * Used to filter workshop by season.
     * @example '2024'
     */
    season: string;
}
