
async function main() {
    const fs = require('fs')
    const csv = require('csv-parser')
    const { PrismaClient } = require('@prisma/client')
    
    
    
    const prisma = new PrismaClient();
        // const data:Prisma.CourseCreateInput[] = [];
        const data = [];
        const errorList = [];
        const table = prisma.school
        fs.createReadStream('schoolsSeed.csv')
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
                                'sc': item.sc,
                                'name': item.name
                            },
                            // skipDuplicates: true
                        });
                    } catch (error) {
                        errorList.push(` {
                            'sc': '${item.sc}',
                            'name': '${item.name}'
                        },`)
                        console.log(error)
                    }
                    // }
                }
    
                console.log('Data seeding completed');
                await prisma.$disconnect();
                if (errorList.length > 0 ) {
                    const content = errorList.join('\n')
    
                    fs.writeFile('seedSchools-tableObject_errors.txt', content, err => {
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