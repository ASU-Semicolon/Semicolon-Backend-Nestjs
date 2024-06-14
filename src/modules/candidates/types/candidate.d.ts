import { Enums } from 'src/types/enums';
import { Evaluation } from './evaluation';

export interface Candidate {
    name: string;
    email: string;
    phone: string;
    college: string;
    first_preference: string;
    first_preference_reason: string;
    second_preference: string;
    second_preference_reason: string;
    previous_experience: string;
    academic_year: string;
    acceptance_status: Enums.CandidateStatus;
    evaluation?: Evaluation;
    type: Enums.CandidateType;
    /**
     * The event where the candidate is applying for.
     * This will be used to filter the candidates based on the event.
     * @example 'recruitment 2024', 'workshops 2024'
     */
    event: string;
}
