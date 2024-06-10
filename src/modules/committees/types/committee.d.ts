import { Sector } from './sectors';

export interface Committee {
    title: string;
    description: string;
    image: string;
    brief: string;
    heads: string[];
    director: string;
    vice_director?: string;
    sector: Sector;
    /**
     * Season in which the committee was created.
     * Used to filter committees by season.
     * @example '2024'
     */
    season: string;
}
