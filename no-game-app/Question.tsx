export interface Question {
    Id: number;
    Text: string | null;
    CreateUtc: Date | null;
    UpdateUtc: Date | null;
    Type: string | null;
    QuestionSetId: number | null;
  }