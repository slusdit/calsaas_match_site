// import { Prisma } from "@prisma/client";

import { PrismaClient } from '@prisma/client';

let searchSeid = "1779309648"
// searchSeid = "1501894172"

const prisma = new PrismaClient();

// async function main(id: string) {
async function lookupTeacherBySeid(id) {

    const teacher = await prisma.teacher.findUnique({
        where: {
            seid : id
        },
        include: {
            sections: {
                include: {
                    course: {
                        include: {
                            // sectionTableId: true,
                            authTableId: true
                        }
                    }
                }
            },
            credentials: true,  
        }
    })   
return teacher
}


lookupTeacherBySeid(searchSeid)
    .then(teacher => {
        if (teacher && teacher.sections) {
            console.log("\n~~~ Teacher Credential Info ~~~\n")
            console.log(`TeacherName: ${teacher.lastName.toUpperCase()}, ${teacher.firstName.toUpperCase()} `)
            console.log(`SEID: ${teacher.seid} `)
            console.log(`empId: ${teacher.empId} `)
            console.log(`sc: ${teacher.sc} `)
            console.log('credentials:')
            for (const credential of teacher.credentials) {
                console.log(`   TeacherAuthCode: ${credential.authCode}, TeacherDocTitle: ${credential.docTitle},`)
            }
            console.log("\n~~~ Section & State info ~~~")
            for (const section of teacher.sections) {
                console.log(`\nCourse Name: ${section.courseName}, State Course Code: ${section.course.stateCourseIdSec}`);
                console.log(`Local Course Code: ${section.courseNumber}, Section ID: ${section.key_id},\n`);
                for (const stateAuth of section.course.authTableId) {
                    console.log(`   StateAuthCode: ${stateAuth.authCode}, StateDocTitle: ${stateAuth.docTitle}`)
                }
            }  
        } 
    })




