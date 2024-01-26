SELECT distinct [CredPersonId] as 'credPersonId'
      ,[DateBirth] as 'dateBirth'
      ,[NameFirst] as 'firstName'
      ,[NameMiddle] as 'middleName'
      ,[NameLast] as 'lastName'
      ,[CredPersonStatusCode] as  'statusCode'
      ,[CALTIDESNumId] as 'caltidesNumId'
  FROM [EscapeOnline_SLUSD].[dbo].[HRCredPerson]
  WHERE CALTIDESNumId is not null