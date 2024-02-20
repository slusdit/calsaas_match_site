'use client'
import { useState } from "react"
import TeacherCard from "../cards/TeacherCard"
import { TeacherCardType } from '@/lib/types'

export default function TeacherListGrid({ teachers, doHighlight }: { teachers: TeacherCardType[], doHighlight?:boolean }) {
    const [isComplete, setIsComplete] = useState(false)
    const [isFullError, setIsFullError] = useState(false)
    const [isFullWarning, setIsFullWarning] = useState(false)
    if (teachers.length === 0) {
        return (<div className="float text-center text-2xl text-muted">Loading...</div>)
    }
    return (
        <div className="no-scrollbar p-1 m-4 max-h-[50rem] max-w-[80rem] overflow-y-scroll flex flex-wrap justify-center border-2 rounded-lg">
            {teachers.map((teacher) => (
                    <TeacherCard 
                        teacher={teacher} 
                        key={teacher.key_id} 
                        doHighlight={doHighlight}
                        
                    />
            ))}

        </div>

    )
}