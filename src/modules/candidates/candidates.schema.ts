import mongoose from 'mongoose';
import { Candidate } from './types/candidate';
import { Enums } from 'src/types/enums';
import { Evaluation } from './types/evaluation';

const EvaluationSchema = new mongoose.Schema<Evaluation>({
    notes: {
        ...Object.values(Enums.EvaluationCriteria).reduce(
            (accumulator, criteria) => {
                accumulator[criteria] = {
                    rating: Number,
                    note: {
                        type: String,
                        trim: true,
                    },
                };
                return accumulator;
            },
            {},
        ),
    },
    interviewer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    } as any,
    date: {
        type: Date,
        default: Date.now,
    },
});

export const CandidateSchema = new mongoose.Schema<Candidate>(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        event: String,
        college: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        first_preference: {
            type: String,
            required: true,
        },
        second_preference: {
            type: String,
            required: true,
        },
        first_preference_reason: {
            type: String,
            required: true,
        },
        second_preference_reason: {
            type: String,
            required: true,
            trim: true,
        },
        previous_experience: {
            type: String,
            required: true,
            trim: true,
        },
        academic_year: {
            type: String,
            enum: Object.values(Enums.AcademicYear),
            required: true,
        },
        acceptance_status: {
            type: String,
            default: Enums.CandidateStatus.PENDING,
            enum: Object.values(Enums.CandidateStatus),
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(Enums.CandidateType),
            required: true,
        },
        evaluation: {
            type: EvaluationSchema,
            required: false,
        },
    },
    { timestamps: true },
);
