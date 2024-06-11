import mongoose from 'mongoose';

export interface EvaluationNotes
    extends Partial<
        Record<
            Enums.EvaluationCriteria,
            {
                rating: 1 | 2 | 3 | 4 | 5;
                note: string;
            }
        >
    > {}

export interface Evaluation {
    notes: EvaluationNotes;
    interviewer: mongoose.Types.ObjectId;
    date: string;
}
