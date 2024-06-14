import { Enums } from 'src/types/enums';
import mongoose from 'mongoose';
import User from 'src/modules/users/types/user';

export interface EvaluationNotes
    extends Partial<
        Record<
            Enums.EvaluationCriteria,
            {
                rating: number;
                note: string;
            }
        >
    > {}

export interface Evaluation {
    notes: EvaluationNotes;
    interviewer: string; // id of the interviewer
    date: Date;
}
