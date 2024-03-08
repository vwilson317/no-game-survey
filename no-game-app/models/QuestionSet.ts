import { Question } from "./Question";

export interface QuestionSet {
    Id: number;
    Name: string | null;
    LastUpdatedUtc: Date | null;
    Questions: Question[];
  }