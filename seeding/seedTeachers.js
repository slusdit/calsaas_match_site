async function main() {
    const fs = require('fs')
    const csv = require('csv-parser')
    const { PrismaClient } = require('@prisma/client')
    
    
    
    const prisma = new PrismaClient();
        // const data:Prisma.TeacherCreateInput[] | [] = [];
        const data= [];
        const errorList = [];
        const table = prisma.teacher
        fs.createReadStream('teacherSeed.csv')
            .pipe(csv())
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');
            
                await table.deleteMany({})
                console.log('Table Truncated')
                for (const item of data) {
                    // if (item.credPersonId) {
                        const seid = item.caltidesNumId === "NULL" ? null : item.caltidesNumId
                    try {
                        const statusTrim = item.statusCode.trim()
                        if (statusTrim === 'NULL' ||  statusTrim === 'R') {
                            errorList.push(item.caltidesNumId)
                            console.log(`Skipping seid ${seid} - code: ${item.statusCode}`)
                            continue
                        }
                        if (seid === undefined) { continue }
                        const birthdate = item.dateBirth === "NULL" ? null : item.dateBirth

                        await table.create({
                            data: {
                                'credPersonId': item.credPersonId,
                                'dateBirth': birthdate,
                                'firstName': item.firstName?.trim(),
                                'middleName': item.middleName?.trim(),
                                'lastName': item.lastName?.trim(),
                                'statusCode': statusTrim,
                                'seid': seid,
                                'caltidesNumId': seid,
                                
                            },
                        });
                        // }
                    }
                    catch (error) {
                        console.log(seid, error)
                    }
                }
                    
    
                console.log('Data seeding completed');
                await prisma.$disconnect();
                if (errorList.length > 0 ) {
                    const content = errorList.join('\n')
    
                    fs.writeFile('seedTeachers-SEID_errors.txt', content, err => {
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