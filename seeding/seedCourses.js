async function main() {
    const fs = require('fs')
    const csv = require('csv-parser')
    const { PrismaClient } = require('@prisma/client')
    
    
    
    const prisma = new PrismaClient();
        // const data:Prisma.CourseCreateInput[] = [];
        const data = [];
        const table = prisma.course
        fs.createReadStream('courseSeed.csv')
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
    
                    await table.create({
                        data: {
                            'stateCourseIdAuth': item.stateCode,
                            'stateCourseIdSec': item.stateCode,
                            // 'courseName': item.courseName,
                            },
                        // skipDuplicates: true
                        });
                    // }
                }
    
                console.log('Data seeding completed');
                await prisma.$disconnect();
            });
    }
    
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });