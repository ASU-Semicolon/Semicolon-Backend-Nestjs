import mongoose from 'mongoose';

export default interface User {
    _id?: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    role: 'admin' | 'hr' | 'member';
    committee: mongoose.Types.ObjectId;
    active?: boolean;
    /**
     * The season in which the user was created.
     * @example '2024'
     */
    season: string;
}
