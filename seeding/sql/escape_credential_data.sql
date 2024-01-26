SELECT 

hrcp.CredPersonId, hrcp.DateBirth, hrcp.NameFirst, hrcp.NameLast
, hre.EmpId, hrcp.CALTIDESNumId
, hrcpc.CredTitleCode as DocTitle

--, hrcpc.CredTypeCode , hrcpc.CredTermCode, hrcpc.DateIssued, hrcpc.CredentialId

, hrcpa.CredAuthCode as AuthCode

, hrcpmajor.CredSubjectCode as SubjectCodeMajor
, hrcpminor.CredSubjectCode as SubjectCodeMinor



FROM HRCredPerson hrcp
JOIN HRCredPersonCred hrcpc ON hrcp.CredPersonId = hrcpc.CredPersonId
LEFT JOIN HRCredPersonAuth hrcpa ON hrcpa.CredentialId = hrcpc.CredentialId
LEFT JOIN HRCredPersonMajor hrcpmajor ON hrcpc.CredentialId = hrcpmajor.CredentialId
LEFT JOIN HRCredPersonMinor hrcpminor ON hrcpc.CredentialId = hrcpminor.CredentialId

LEFT JOIN HREmployment hre ON hre.NameFirst = hrcp.NameFirst
    AND hre.NameLast = hrcp.NameLast
    AND hre.DateBirth = hrcp.DateBirth
    AND hre.GenderCode = hrcp.GenderCode

WHERE 1=1
AND hrcpc.DateArchived IS NULL
--AND hrcpc.CredTitleCode IS NOT NULL
--AND hrcp.NameLast LIKE '%Abadia%' AND hrcp.NameFirst LIKE '%Meli%'
--AND hrcp.NameLast LIKE '%Jagr%' AND hrcp.NameFirst LIKE '%Lau%'