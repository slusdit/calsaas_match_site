import TeacherCard from "@/app/components/TeacherCard2"
import { TeacherCardType } from "@/app/components/TeacherCard"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import TeacherCard2 from "@/app/components/TeacherCard2"

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
      console.log(teacher)
      return teacher
    }
    const teacher = await fetchTeacherBySeid(seid)
    console.log(teacher)
    return teacher;
  }

const teacher = await fetchTeacher({seid}) 
  
  return (
    <div className="flex justify-center">
      <TeacherCard teacher={teacher}/>
      <TeacherCard2 teacher={teacher} />
    </div>
  )
}

export default testPage