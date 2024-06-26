import mongoose from 'mongoose';

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
    interviewer: mongoose.Types.ObjectId;
    date: string;
}
