import {  PrismaClient, Teacher, Section, Prisma } from "@prisma/client"
import Link from "next/link"
import TeacherCard from "./components/TeacherCard"

export interface TeacherCardType extends Teacher{
  sections: Section[]
  credentials: Credential[]
}

const prisma = new PrismaClient
const fetchTeachers = async (): Promise<Teacher[]> => {
  const teachers = await prisma.teacher.findMany({
    // take: 10,
    orderBy: {
      // TODO: Add SC once table is setup
      // sc: 'asc', 
      lastName: 'asc'
    }, 
    include: {
      sections: true,
      credentials: true
      }
  });
  return teachers
}

export default async function TeacherList() {
  const teachers = await fetchTeachers()

  return (
    <main>
      <div className="py-3 px-2/8 flex flex-wrap justify-center">
        {teachers.map((teacher) => {
           if (teacher.sections.length > 0) {
              return <TeacherCard teacher={teacher} />
            }
            })}
      </div>
    </main>
  )
}