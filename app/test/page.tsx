'use client'
import TeacherCard from "@/app/components/cards/TeacherCard"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import TeacherCard2 from "@/app/components/cards/TeacherCard"
import { TeacherCard as CardWithForm } from "./components/TeacherCard"
import { ModeToggle } from "../components/buttons/ModeToggle"
import TeacherTabs from "../components/teacherSearch/TeacherTabs"
import TeacherData from "./components/TeacherData"
// import { testEscapeQuery } from "@/lib/escape"
import { Button } from "@/components/ui/button"

const prisma = new PrismaClient()
const testPage = async () => {
  const seid:string = '2015780964'
  
  const fetchTeacher = async ({seid}:{seid:string}) => {
    const body = {
      "seid": seid
    }
    
    const fetchTeacherBySeid = async (seid: string) => {
      const teacher = await prisma.teacher.findUnique({
        where: {
          seid
        },
        include: {
    
          sections: {
            include: {
              course: {
                include: {
                  authTableId: true
                }
              }
            }
          },
    
          credentials: true,
        },
    
      })
    
      if (!teacher) {
        notFound();
      }
      
      return teacher
    }
    const teacher = await fetchTeacherBySeid(seid)
    
    return teacher;
  }

  const fetchTeachers = async () => {
    const fetchTeachers = async () => {
      const teachers = await prisma.teacher.findMany({
        take: 100,
        orderBy: {
          lastName: 'asc',
        },
        include: {
          sections: true,
          credentials: true,
        },
      });
    
      if (!teachers) {
        notFound();
      }
     
      return teachers
    }
    const teachers = await fetchTeachers()

    return teachers
  }



const teacher = await fetchTeacher({seid}) 

const teachers = await fetchTeachers()
  
  return (
    <div className="flex w-dvw h-full justify-center items-center">

      <div className="text-2xl">Test Page</div>
    
    </div>
  )
}

export default testPage