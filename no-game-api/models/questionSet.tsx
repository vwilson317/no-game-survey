import { Question } from "./question.tsx";

export interface QuestionSet {
    Id: number;
    Name: string | null;
    LastUpdatedUtc: Date | null;
    Questions: Question[];
  }