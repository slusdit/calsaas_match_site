'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { TeacherCardType } from "@/lib/types"
import { StateCourseAuth, TeacherCredential } from "@prisma/client";
import { credentialAuthMatch, jp } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MatchCountBadges from "./MatchCountBadges";
import { useState } from "react";

interface Props {
    teacher: TeacherCardType
    doHighlight?: boolean,
    showComplete?: boolean,
    showFullError?: boolean,
    showFullWarning?: boolean

}

export default function TeacherCard({ teacher, doHighlight }: Props) {

    const [isComplete, setIsComplete] = useState(false)
    const [isFullError, setIsFullError] = useState(false)
    const [isFullWarning, setIsFullWarning] = useState(false)
    const countMatches = (teacher: TeacherCardType) => {
        let matchCount = 0
        let noMatchCount = 0
        let errorCount = 0
        if (teacher.sections) {
            teacher.sections.forEach((section) => {
                const matched = credentialAuthMatch({
                    credentials: teacher.credentials,
                    stateCourseAuth: section.course.authTableId
                })


                if (matched === 'match') {
                    matchCount++
                }
                if (matched === 'noAuth' || matched === 'noCredentials') {
                    errorCount++
                }
                if (matched === 'noMatch') {
                    noMatchCount++
                }
            });

            return {
                matchCount: matchCount,
                noMatchCount: noMatchCount,
                errorCount: errorCount
            };
        }
        return {
            matchCount: 0,
            noMatchCount: 0,
            errorCount: 99
        }
    }

    const counts = countMatches(teacher)
    let cardBg = 'bg-card'
    if(doHighlight){

        if (isComplete) {
           
            cardBg = 'bg-spotlight-highlight'
        }else
        if (isFullError) {
            
            cardBg = 'bg-destructive-highlight' 
        }else
        if (isFullWarning){
        
            cardBg = 'bg-warning-highlight'
        }
    }

    const credBg = teacher.credentials.length > 0 ? '' : 'bg-destructive text-destructive-foreground'

    return (
        <Link href={`/teacher/${teacher.seid}`} className={`h-full`} >
            <Card className={`
                    w-72 
                    min-h-56 
                    m-2
                    text-center 
                    text-bg-foreground
                    rounded-xl 
                    overflow-hidden 
                    border-2 
                    cursor-pointer
                    hover:shadow-sm
                    hover:shadow-primary 
                    ${cardBg}
                `}>
                <div className=" 
                        hover:scale-105
                        transition-transform 
                        duration-300
                        "
                >
                    <CardHeader className="py">
                        <CardTitle className="h-12 inline-block align-middle overflow-hidden">{teacher.lastName}, {teacher.firstName}</CardTitle>
                        <CardDescription>
                            <span >SEID: {teacher.seid}</span>
                            <div className="p-2">

                            <MatchCountBadges 
                                icons
                                counts={counts} 
                                courseCount={teacher.sections.length} 
                                setIsComplete={setIsComplete} 
                                setIsFullError={setIsFullError}
                                setIsFullWarning={setIsFullWarning}
                                />
                                </div>
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center align-bottom divide-x-1 mt-2">
                            <div className="p-2 w-full">
                                Section Count: <br />
                                {teacher.sections?.length}
                            </div>
                            {/* <div className="w-0.5 bg-border"></div> */}
                            {teacher.credentials && teacher.credentials.length !== 0 ? (
                                <div className="p-2 w-full ">
                                    Credential Count: <br />
                                    {teacher.credentials.length}
                                </div>
                            ) : (
                                <div className="p-2 w-full bg-destructive text-destructive-foreground rounded-2xl">
                                    Credential Count: <br />
                                    0
                                </div>
                            )}
                        </div>
                    </CardContent>
                </div>
            </Card>
        </Link>
    )
}
