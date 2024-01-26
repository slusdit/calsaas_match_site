SELECT  DISTINCT STU.SC
        , TCH.TE
        , TCH.ID [STAFFID]
        , STF.SID [SEID]
        , CRS.C3 [CA_COURSE_CODE]
        , CAR.SE
        , CAR.PD
        , CRS.CN
        , CRS.CO
        , CRS.DE
FROM STU
JOIN CAR ON STU.SC = CAR.SC AND STU.SN = CAR.SN
JOIN TCH ON CAR.SC = TCH.SC AND CAR.TN = TCH.TN
JOIN STF ON TCH.ID = STF.ID
JOIN CRS ON CAR.CN = CRS.CN
WHERE   STU.DEL = 0
        AND STU.TG = ''
        AND TCH.TG = ''
        AND CAR.DEL = 0
        AND TCH.DEL = 0
        AND STF.DEL = 0
        AND CRS.DEL = 0
        AND CRS.C3 not in (6012)
-- ORDER BY STU.SC, CAR.SE

UNION 

SELECT  DISTINCT STU.SC 
        , TCH.TE
        , STF.ID [STAFFID]
        , STF.SID [SEID]
        , TCH.CB [CA_COURSE_CODE]
        , '' SE
        , '' PD
        , '1000' CN
        , 'Elementary Grade' CO
        , 'Elementary Grade Self Contained Course' DE
FROM STU
JOIN TCH ON STU.SC = TCH.SC AND STU.CU = TCH.TN   
JOIN STF ON TCH.ID = STF.ID    
WHERE   STU.DEL = 0
        AND STU.TG = ''
        AND TCH.TG = ''
        AND TCH.DEL = 0
        AND STF.DEL = 0
		AND STU.GR <= 5
-- ORDER BY STU.SC, CAR.SE