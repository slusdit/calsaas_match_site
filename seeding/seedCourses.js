async function main() {
    const fs = require('fs')
    const csv = require('csv-parser')
    const { PrismaClient } = require('@prisma/client')
    
    
    
    const prisma = new PrismaClient();
        // const data:Prisma.CourseCreateInput[] = [];
        const data = [];
        const errorList =[]
        const table = prisma.course
        fs.createReadStream('courses.csv')
            .pipe(csv())
            .on('data', (row) => {
                data.push(row);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');
            
                await table.deleteMany({})
                console.log('Table Truncated')
                for (const item of data) {
                    const data = {
                        'stateCourseIdAuth': item.stateCode,
                        'stateCourseIdSec': item.stateCode,
                        'localCourseNumber': item.courseNumber,
                        'localCourseName': item.courseName,
                    }
                    // console.log(data)
                    try{
                    await table.create({
                        data: data,
                        // skipDuplicates: true
                        });
            } catch (error) {
               
                console.log(`Local Course Number ${item.courseName}`)
                errorList.push(data)

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