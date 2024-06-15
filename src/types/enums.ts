export namespace Enums {
    export enum Sector {
        web = 'web development',
        embedded = 'embedded systems',
        software_engineering = 'software engineering',
        operational = 'operational',
        other = 'other',
    }
    export enum EvaluationCriteria {
        COMMITMENT = 'commitment',
        TEAMWORK = 'teamwork',
        TIME_MANAGEMENT = 'time management',
        COMMUNICATION_SKILLS = 'communication skills',
        FLEXIBILITY = 'flexibility',
        ETHICS = 'ethics',
        LEADERSHIP = 'leadership',
        STRESS_MANAGEMENT = 'stress management',
        PROBLEM_SOLVING = 'problem solving',
        EAGER_TO_LEARN = 'eager to learn',
    }
    export enum CandidateStatus {
        ACCEPTED = 'accepted',
        ACCEPTED_SECOND_PREFERENCE = 'accepted-second-preference', // accepted in second preference
        REJECTED = 'rejected',
        PENDING = 'pending',
        EMAILED = 'emailed',
        FILTERED = 'filtered',
        SCHEDULED = 'scheduled',
        DELEGATED = 'delegated', // from first preference to second preference
    }
    export enum AcademicYear {
        FRESHMAN = 'freshman (1st year)',
        SOPHOMORE = 'sophomore (2nd year)',
        JUNIOR = 'junior (3rd year)',
        SENIOR1 = 'senior 1 (4th year)',
        SENIOR2 = 'senior 2 (5th year)',
        GRADUATED = 'graduated',
        OTHER = 'other',
    }
    export enum CandidateType {
        MEMBER = 'member', // apply to become a member of the community
        STUDENT = 'student', // apply to become a student in a workshop
    }
    export enum WorkshopState {
        NOT_STARTED = 'not-started',
        IN_PROGRESS = 'in-progress',
        FINISHED = 'finished',
    }
    export enum Event {
        RECRUITMENT_24 = 'Recruitment 24',
        WORKSHOPS_24 = 'Workshops 24',
        RECRUITMENT_25 = 'Recruitment 25',
        WORKSHOPS_25 = 'Workshops 25',
        // add more events later...
    }
}
