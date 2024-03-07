CREATE TABLE [dbo].[Question]
(
  [Id] BIGINT IDENTITY(1,1) PRIMARY KEY,
  [Text] NVARCHAR(MAX) NULL,
  [CreateUtc] DATETIME NULL,
  [UpdateUtc] DATETIME NULL,
  [Type] VARCHAR (255),
  [QuestionSetId] BIGINT,
  FOREIGN KEY (QuestionSetId) REFERENCES QuestionSet(Id)
)