CREATE TABLE [dbo].[Question]
(
  [Id] BIGINT NOT NULL PRIMARY KEY,
  [Text] NVARCHAR(MAX) NULL,
  [CreateUtc] DATETIME NULL,
  [UpdateUtc] DATETIME NULL,
  [Type] VARCHAR (255),
  [QuestionSetId] BIGINT,
  FOREIGN KEY (QuestionSetId) REFERENCES QuestionSet(Id)
)