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
                        try {
                            await table.create({
                            data: {
                                'credPersonId': item.CredPersonId,
                                'caltidesNumId': item.CaltidesNumId,
                                'docTitle': item.DocTitle?.trim(),
                                'authCode': item.AuthCode?.trim(),
                                'subjectCodeMajor': subjectMoajor,
                                'subjectCodeMinor': subjectMinor,
                                },
                            });
                            
                        } catch (error) {
                            errorList.push(`{
                                'credPersonId': '${item.CredPersonId}',
                                'caltidesNumId': '${item.CaltidesNumId}',
                                'docTitle': '${item.DocTitle?.trim()}',
                                'authCode': '${item.AuthCode?.trim()}',
                                'subjectCodeMajor': '${subjectMoajor}',
                                'subjectCodeMinor': '${subjectMinor}',
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