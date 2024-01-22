// import { Prisma } from "@prisma/client";

import { PrismaClient } from '@prisma/client';

let courseId = "2450"

const prisma = new PrismaClient();

// async function main(id: string) {
async function lookupCourseById(id) {

    const course = await prisma.section.findMany({
        where: {
            courseNumber: id 
        },
        include: {
            teacher: {
                include: {
                    credentials: true
                }
            },
            course: {
                include: {
                    authTableId: true
                }
            }
            }
           
    })   
return course
}


lookupCourseById(courseId)
    .then(course => {
        if (course) {
            console.log(course)
            
            
        }
    })