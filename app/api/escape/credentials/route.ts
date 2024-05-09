import { escapeConfig, escapeQuery } from '../../../../lib/escape'
import { NextResponse } from "next/server"

type CredentialEscapeResponse = {
    CredPersonId: number,
    DateBirth: Date,
    NameFirst: string,
    NameLast: string,
    EmpId?: number | null,
    CALTIDESNumId?: number | null,
    DocTitle: string,
    AuthCode: string,
    SubjectCodeMajor?: string | null,
    SubjectCodeMinor?: string | null
}

const credentialQuery = `SELECT 

hrcp.CredPersonId, hrcp.DateBirth, hrcp.NameFirst, hrcp.NameLast
, hre.EmpId, hrcp.CALTIDESNumId
, hrcpc.CredTitleCode as DocTitle

--, hrcpc.CredTypeCode , hrcpc.CredTermCode, hrcpc.DateIssued, hrcpc.CredentialId

, hrcpa.CredAuthCode as AuthCode

, hrcpmajor.CredSubjectCode as SubjectCodeMajor
, hrcpminor.CredSubjectCode as SubjectCodeMinor



FROM EscapeOnline_SLUSD.dbo.HRCredPerson hrcp
JOIN EscapeOnline_SLUSD.dbo.HRCredPersonCred hrcpc ON hrcp.CredPersonId = hrcpc.CredPersonId
LEFT JOIN EscapeOnline_SLUSD.dbo.HRCredPersonAuth hrcpa ON hrcpa.CredentialId = hrcpc.CredentialId
LEFT JOIN EscapeOnline_SLUSD.dbo.HRCredPersonMajor hrcpmajor ON hrcpc.CredentialId = hrcpmajor.CredentialId
LEFT JOIN EscapeOnline_SLUSD.dbo.HRCredPersonMinor hrcpminor ON hrcpc.CredentialId = hrcpminor.CredentialId

LEFT JOIN EscapeOnline_SLUSD.dbo.HREmployment hre ON hre.NameFirst = hrcp.NameFirst
    AND hre.NameLast = hrcp.NameLast
    AND hre.DateBirth = hrcp.DateBirth
    AND hre.GenderCode = hrcp.GenderCode

WHERE 1=1
AND hrcpc.DateArchived IS NULL
--AND hrcpc.CredTitleCode IS NOT NULL
--AND hrcp.NameLast LIKE '%Abadia%' AND hrcp.NameFirst LIKE '%Meli%'
--AND hrcp.NameLast LIKE '%Jagr%' AND hrcp.NameFirst LIKE '%Lau%'
`

async function updateCredentials(data: CredentialEscapeResponse[]) {

    const fs = require("fs");
    const csv = require("csv-parser");
    const { PrismaClient } = require("@prisma/client");

    const prisma = new PrismaClient();
    // const data = [];
    const errorList = [];
    const table = prisma.teacherCredential;
    const supportEmail = "support@slusd.us";

    const supportUser = await prisma.user.upsert({
        where: {
            email: "support@slusd.us",
        },
        create: {
            name: "Automation",
            email: supportEmail,
            role: ["ADMIN"],
        },
        update: {
            name: "Automation Robot",
        },
    });

    console.log(supportUser);
    console.log("CSV file successfully processed");

    await table.deleteMany({
        where: {
            credPersonId: {
                not: null,
            },
        },
    });
    console.log("Table Truncated");
    try {
        for (const item of data) {
            // if (item.credPersonId) {
            const subjectMinor =
                item.SubjectCodeMinor?.trim() === "NULL"
                    ? null
                    : item.SubjectCodeMinor?.trim();
            const subjectMoajor =
                item.SubjectCodeMajor?.trim() === "NULL"
                    ? null
                    : item.SubjectCodeMajor?.trim();
            const authCode =
                item.AuthCode?.trim() === "NULL" ? null : item.AuthCode.trim();
            const docTitle =
                item.DocTitle?.trim() === "NULL" ? null : item.DocTitle.trim();
            try {
                // await table.upsert({
                //   where: {
                //     credPersonId: null,
                //     seid: item.CALTIDESNumId,
                //     caltidesNumId: item.CALTIDESNumId,
                //     docTitle: docTitle,
                //     authCode: authCode,
                //     subjectCodeMajor: subjectMoajor,
                //     subjectCodeMinor: subjectMinor,
                //   },
                //   update: {
                //     credPersonId: item.CredPersonId,
                //     created_by: supportEmail,
                //   },
                //   create: {
                //     credPersonId: item.CredPersonId,
                //     seid: item.CALTIDESNumId,
                //     caltidesNumId: item.CALTIDESNumId,
                //     docTitle: docTitle,
                //     authCode: authCode,
                //     created_by: supportEmail,
                //     subjectCodeMajor: subjectMoajor,
                //     subjectCodeMinor: subjectMinor,
                //   },
                // });
                await table.create({
                    data: {
                        credPersonId: item.CredPersonId,
                        seid: item.CALTIDESNumId,
                        caltidesNumId: item.CALTIDESNumId,
                        docTitle: docTitle,
                        authCode: authCode,
                        created_by: "support@slusd.us",
                        subjectCodeMajor: subjectMoajor,
                        subjectCodeMinor: subjectMinor,
                    },
                });
            } catch (error) {
                errorList.push(`{
                          'credPersonId': ${item.CredPersonId},
                          'seid': ${item.CALTIDESNumId},
                          'caltidesNumId': ${item.CALTIDESNumId},
                          'docTitle': ${item.DocTitle?.trim()},
                          'authCode': ${item.AuthCode?.trim()},
                          'subjectCodeMajor': ${subjectMoajor},
                          'subjectCodeMinor': ${subjectMinor},
                          },
                          }`);
                console.log(error);
            }
        }
    } catch (error) {
        errorList.push;
        // console.log(error)
    }

    console.log("Data seeding completed");
    await prisma.$disconnect();

    if (errorList.length > 0) {
        const content = errorList.join("\n");

        fs.writeFile(
            "seedCredentials-TeacherCredentialObject_errors.txt",
            content,
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            }
        );
    }
}

export async function GET(request: Request) {
    const sql = require("mssql");
    let conn
    try {
        conn = await sql.connect(escapeConfig);

        const result:CredentialEscapeResponse[] = await conn.query(credentialQuery);
        // const result = await conn.query("SELECT top 10 * FROM EscapeOnline_SLUSD.dbo.HREmployment");
        console.log(result);
        await conn.close();
        await updateCredentials(result)
        return NextResponse.json({
            result
            })
    } catch (err) {
        console.error("SQL error: ", err);
        return NextResponse.json({
            message: "Error",
            error: err
        });
    }
    // const data = await escapeQuery("SELECT * FROM [EscapeOnline_SLUSD].[dbo].[HRSchool]")
    // console.log(data)
    // return NextResponse.json({
    //     schools: data
    //     })

}