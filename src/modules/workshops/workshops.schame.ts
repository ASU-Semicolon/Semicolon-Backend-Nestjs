import mongoose from 'mongoose';
import { Workshop } from './types/workshop';
import { Enums } from '../../types/enums';

export const WorkshopSchema = new mongoose.Schema<Workshop>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration_in_sessions: {
            type: Number,
            required: true,
        },
        sessions_per_week: {
            type: Number,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        committee: {
            type: mongoose.Types.ObjectId,
            ref: 'Committee',
            required: true,
        },
        state: {
            type: String,
            required: true,
            enum: Object.values(Enums.WorkshopState),
            default: Enums.WorkshopState.NOT_STARTED,
        },
        instructor: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        prerequisites: {
            type: [String],
            required: true,
        },
        cover_image: {
            type: String,
        },
        season: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
