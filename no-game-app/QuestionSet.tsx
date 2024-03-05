import { Question } from "./question";

export interface QuestionSet {
    Id: number;
    Name: string | null;
    LastUpdatedUtc: Date | null;
    Questions: Question[];
  }