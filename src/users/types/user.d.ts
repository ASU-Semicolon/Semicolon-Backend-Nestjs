import mongoose from 'mongoose';

export default interface User {
    email: string;
    username: string;
    password: string;
    phone: string;
    role: 'admin' | 'hr' | 'member';
    committee: mongoose.Types.ObjectId;
    active?: boolean;
}
