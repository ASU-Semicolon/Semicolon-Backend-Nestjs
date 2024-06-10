import mongoose from 'mongoose';
import { Candidate } from './types/candidate';
import { Enums } from 'src/types/enums';

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
            type: {
                notes: {
                    ...Object.values(Enums.EvaluationCriteria).reduce(
                        (accumulator, criteria) => {
                            accumulator[criteria] = {
                                type: {
                                    rating: {
                                        type: Number,
                                        enum: [1, 2, 3, 4, 5],
                                    },
                                    note: {
                                        type: String,
                                        trim: true,
                                    },
                                },
                            };
                            return accumulator;
                        },
                        {},
                    ),
                },
                interviewer: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        },
    },
    { timestamps: true },
);
