const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

async function main() {
const prisma = new PrismaClient();
    const data = [];
    const errorList =[]
    fs.createReadStream('coursecodes_to_authorizations.csv')
        .pipe(csv())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');
            await prisma.stateCourseAuth.deleteMany({})
            console.log('Table truncated')
            for (const item of data) {
                try {
                
                await prisma.stateCourseAuth.create({
                    
                    data: {
                        stateCourseNumber: item.CourseCode,
                        authType: item.AuthType,
                        docTitle: item.DocumentTitle,
                        authTitle: item.AuthorizationTitle,
                        authCode: item.AuthorizationCode,
                        subjectCode: item.SubjectCode,
                        subject: item.Subject,
                        notes: item.Notes || null,
                    },
                });
            } catch (error) {
                // console.log(error)
                console.log(item)
                console.log(error)
                console.log(`State Course Number: ${item.CourseCode}`)
                if (item.stateCourseNumber === undefined) { continue }
                errorList.push(item.stateCourseNumber)
            }
            }

            console.log('Data seeding completed');
            await prisma.$disconnect();
            if (errorList.length > 0 ) {
                const content = errorList.join('\n')

                fs.writeFile('seedAuth-StateCode_errors.txt', content, err => {
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
