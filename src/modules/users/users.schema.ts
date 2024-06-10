import mongoose from 'mongoose';
import User from './types/user';

export const UsersSchema = new mongoose.Schema<User>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        season: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        committee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Committee',
            required: false,
        },
        role: {
            type: String,
            required: true,
            enum: ['admin', 'hr', 'member'],
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true },
);
