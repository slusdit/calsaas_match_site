SELECT DISTINCT
CRS.C3 'stateCode'
, SEC.SC 'sc'
, CONCAT(MST.SC, '_', MST.SE) 'sectionId'
, TCH.ID 'empId'
, TCH.ID2 'empId2'
, STF.SID 'seid'
, str(MST.SE) 'sectionNumber'
, CONCAT(MST.LO,'-',MST.HI) 'grade'
, CRS.CO 'courseName'
, CRS.CN 'courseNumber'
, MST.PD 'period'

FROM SEC 
JOIN MST ON SEC.SC = MST.SC AND SEC.SE = MST.SE
JOIN TCH ON MST.SC = TCH.SC AND MST.TN = TCH.TN
JOIN CRS ON MST.CN = CRS.CN
JOIN STF ON TCH.ID = STF.ID
WHERE 1 = 1
    AND MST.SC BETWEEN 10 and 60
    AND SEC.DEL = 0
    AND MST.DEL = 0
    AND TCH.DEL = 0
    AND CRS.DEL = 0

UNION

select 
TCH.CB 'stateCode'
, TCH.SC 'sc'
, CONCAT(TCH.SC,'_',TCH.TN) 'sectionId'
, TCH.ID 'empId'
, TCH.ID2 'empId2'
, STF.SID 'seid'
, TCH.TLN 'sectionNumber'
,'' 'grade'
, CONCAT(TCH.LO,'-',TCH.HI) 'courseName'
, CONCAT(TCH.SC,'_',TCH.TN) 'courseNumber'
,1 'period'
from TCH
LEFT JOIN STF ON TCH.ID = STF.ID
where 1=1 
and TCH.SC BETWEEN 2 and 10
AND STF.SID IS NOT NULL
AND TCH.TS != 0
AND STF.SID != ''
AND TCH.DEL = 0

order by SC, sectionNumber