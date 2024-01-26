import { PrismaClient, Teacher, Section, Prisma } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TeacherListGrid from "./components/TeacherListGrid"
import TeacherSearch from "./components/TeacherSearch"

export interface TeacherCardType extends Teacher{
  sections: Section[]
  credentials: Credential[]
}

const prisma = new PrismaClient

const fetchTeachers = async ():Promise<TeacherCardType[]> => {
  const teachers = await fetch('http://localhost:3000/api/teachers', { method: 'POST' })
  const data:TeacherCardType[] = await teachers.json()
  return data
}

export default async function TeacherList() {
  const teachers = await fetchTeachers()

  return (
    <main>
      <TeacherSearch />
    </main>
  )
}