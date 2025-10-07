async function main() {
    const { PrismaClient } = require('@prisma/client');
    const { execSync } = require('child_process');
    
    const prisma = new PrismaClient();
    
    try {
        console.log('Starting database reset...\n');
        
        // Delete in reverse order of dependencies
        console.log('1. Deleting TeacherCredentials...');
        await prisma.teacherCredential.deleteMany({});
        
        console.log('2. Deleting Sections...');
        await prisma.section.deleteMany({});
        
        console.log('3. Deleting StateCourseAuth...');
        await prisma.stateCourseAuth.deleteMany({});
        
        console.log('4. Deleting Teachers...');
        await prisma.teacher.deleteMany({});
        
        console.log('5. Deleting Courses...');
        await prisma.course.deleteMany({});
        
        console.log('6. Deleting Schools...');
        await prisma.school.deleteMany({});
        
        console.log('7. Deleting Exemptions...');
        await prisma.exemptions.deleteMany({});
        
        console.log('\nDatabase cleared successfully!\n');
        
        // Now run seed scripts in correct order
        console.log('Starting seeding process...\n');
        
        console.log('1. Seeding Schools...');
        execSync('node seedSchools.js', { cwd: __dirname, stdio: 'inherit' });
        
        console.log('\n2. Seeding Courses...');
        execSync('node seedCourses.js', { cwd: __dirname, stdio: 'inherit' });
        
        console.log('\n3. Seeding Auth...');
        execSync('node seedAuth.js', { cwd: __dirname, stdio: 'inherit' });
        
        console.log('\n4. Seeding Teachers...');
        execSync('node seedTeachers.js', { cwd: __dirname, stdio: 'inherit' });
        
        console.log('\n5. Seeding Sections...');
        execSync('node seedSections.js', { cwd: __dirname, stdio: 'inherit' });
        
        console.log('\n6. Seeding Credentials...');
        execSync('node seedCredentials.js', { cwd: __dirname, stdio: 'inherit' });
        
        console.log('\n✅ All seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Error during reset/seed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();