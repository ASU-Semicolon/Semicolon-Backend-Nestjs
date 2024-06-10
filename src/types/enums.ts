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
        REJECTED = 'rejected',
        PENDING = 'pending',
        EMAILED = 'emailed',
        FILTERED = 'filtered',
        SCHEDULED = 'scheduled',
        DELEGATED = 'delegated', // from first preference to second preference
    }
    export enum AcademicYear {
        FRESHMAN = 'Freshman (1st year)',
        SOPHOMORE = 'Sophomore (2nd year)',
        JUNIOR = 'Junior (3rd year)',
        SENIOR1 = 'Senior 1 (4th year)',
        SENIOR2 = 'Senior 2 (5th year)',
    }
    export enum CandidateType {
        MEMBER = 'member', // apply to become a member of the community
        STUDENT = 'student', // apply to become a student in a workshop
    }
}
