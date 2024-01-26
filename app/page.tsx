import { PrismaClient, Teacher, Section, Prisma } from "@prisma/client"
import TeacherCard from "./components/TeacherCard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
      <div className="search-bar p-6 m-auto">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="searchOption">Search by SEID: </Label>
      <Input id="searchOption" type="text" placeholder="DO NOT USE" />
    </div>
        </div>
      <div className="py-3 px-2/8 flex flex-wrap justify-center">
        {teachers.map((teacher) => {
          //  if (teacher.sections.length > 0) {
              return <TeacherCard teacher={teacher} key={teacher.seid}/>
            // }
            })}
      </div>
    </main>
  )
}