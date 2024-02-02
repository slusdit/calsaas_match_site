
import { Section, Teacher } from "@prisma/client"
import TeacherCard from "./TeacherCard"

export interface TeacherCardType extends Teacher{
    sections: Section[]
    credentials: Credential[]
  }

export default function TeacherListGrid({teachers}:{teachers:TeacherCardType[]}) {
    if (teachers.length === 0) {
        return ( <div className="float text-center">No Teachers Found</div>)
    }
    return (
        
        <div className="py-3 px-2/8 flex flex-wrap justify-center">
            
        {teachers.map((teacher) => (
            //  if (teacher.sections.length > 0) {
                <TeacherCard teacher={teacher} key={teacher.key_id} />
                // }
            ))}
      </div>
    )
}