
import { Section, Teacher } from "@prisma/client"
import TeacherCard from "./TeacherCard"

export interface TeacherCardType extends Teacher{
    sections: Section[]
    credentials: Credential[]
  }

export default function TeacherListGrid({teachers}:{teachers:TeacherCardType[]}) {

    return (
        
        <div className="py-3 px-2/8 flex flex-wrap justify-center">
        {teachers.map((teacher) => {
            //  if (teacher.sections.length > 0) {
                return <TeacherCard teacher={teacher} key={teacher.seid}/>
                // }
            })}
      </div>
    )
}