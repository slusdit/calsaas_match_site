async function main() {
const fs = require('fs')
const csv = require('csv-parser')
const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient();
    const data = [];
    const errorList = [];
    const table = prisma.teacherCredential
    fs.createReadStream('escape-credential-data.csv')
        .pipe(csv())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');
            
            await table.deleteMany({})
            console.log('Table Truncated')
            try {
                
                for (const item of data) {
                    // if (item.credPersonId) {
                    const subjectMinor = item.SubjectCodeMinor?.trim() === 'NULL' ? null : item.SubjectCodeMinor?.trim()
                    const subjectMoajor = item.SubjectCodeMajor?.trim() === 'NULL' ? null : item.SubjectCodeMajor?.trim()
                    const authCode = item.AuthCode?.trim() === "NULL" ? null : item.AuthCode.trim()
                    const docTitle = item.DocTitle?.trim() === "NULL" ? null : item.DocTitle.trim()
                        try {
                            await table.create({
                            data: {
                                'credPersonId': item.CredPersonId,
                                'seid': item.CALTIDESNumId,
                                'caltidesNumId': item.CALTIDESNumId,
                                'docTitle': docTitle,
                                'authCode': authCode, 
                                'created_by': 'support@slusd.us',
                                'subjectCodeMajor': subjectMoajor,
                                'subjectCodeMinor': subjectMinor,
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
                                }`)
                            console.log(error)
                        }
                    // }
                }
            } catch (error) {
                errorList.push
                // console.log(error)
                
            }

            console.log('Data seeding completed');
            await prisma.$disconnect();

            if (errorList.length > 0 ) {
                const content = errorList.join('\n')

                fs.writeFile('seedCredentials-TeacherCredentialObject_errors.txt', content, err => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
            }
        });
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});