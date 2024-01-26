
async function main() {
    const fs = require('fs')
    const csv = require('csv-parser')
    const { PrismaClient } = require('@prisma/client')
    
    
    
    const prisma = new PrismaClient();
        // const data:Prisma.CourseCreateInput[] = [];
        const data = [];
        const errorList = [];
        const table = prisma.section
        fs.createReadStream('sectionsSeed.csv')
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
                    try {
                        
                        await table.create({
                            data: {
                                'stateCode': item.stateCode,
                                'sc': item.sc,
                                'sectionId': item.sectionId,
                                'empId': item.empId,
                                'empId2': item.empId2,
                                'seid': item.seid,
                                'sectionNumber': item.sectionNumber,
                                'grade': item.grade,
                                'courseName': item.courseName,
                                'courseNumber': item.courseNumber,
                                'period': item.period
                            },
                            // skipDuplicates: true
                        });
                    } catch (error) {
                        errorList.push(`{
                            'stateCode': '${item.stateCode}',
                            'sc': '${item.sc}',
                            'sectionId': '${item.sectionId}',
                            'empId': '${item.empId}',
                            'empId2': '${item.empId2}',
                            'seid': '${item.seid}',
                            'sectionNumber': '${item.sectionNumber}',
                            'grade': '${item.grade}',
                            'courseName': '${item.courseName}',
                            'courseNumber': '${item.courseNumber}',
                            'period': '${item.perio}'
                        },`)
                        console.log(error)
                    }
                    // }
                }
    
                console.log('Data seeding completed');
                await prisma.$disconnect();
                if (errorList.length > 0 ) {
                    const content = errorList.join('\n')
    
                    fs.writeFile('seedSections-tableObject_errors.txt', content, err => {
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