import mongoose from 'mongoose';
import { Committee } from './types/committee';

export const CommitteeSchema = new mongoose.Schema<Committee>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        season: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brief: {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            required: true,
        },
        heads: {
            type: [String],
            required: true,
        },
        director: {
            type: String,
            required: true,
        },
        vice_director: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
