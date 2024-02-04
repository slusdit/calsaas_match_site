
import { Section, Teacher } from "@prisma/client"
import TeacherCard from "../cards/TeacherCard"

import { TeacherCardType } from '@/lib/types'
import { ScrollArea } from "@radix-ui/react-scroll-area"



export default function TeacherListGrid({ teachers }: { teachers: TeacherCardType[] }) {
    if (teachers.length === 0) {
        return (<div className="float text-center">No Teachers Found</div>)
    }
    return (
        <div className="no-scrollbar p-1 m-4 max-h-[50rem] max-w-[80rem] overflow-y-scroll flex flex-wrap justify-center border-2 rounded-lg">
            {teachers.map((teacher) => (
                //  if (teacher.sections.length > 0) {
                <TeacherCard teacher={teacher} key={teacher.key_id} />
                // }
            ))}

        </div>

    )
}