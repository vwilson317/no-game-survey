CREATE TABLE [dbo].[QuestionSet]
(
  [Id] BIGINT IDENTITY(1,1) PRIMARY KEY,
  [Name] NVARCHAR(MAX) NULL,
  [LastUpdatedUtc] DATETIME NULL
)
