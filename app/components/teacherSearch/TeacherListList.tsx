import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TeacherCardType } from '@/lib/types'
import { getSchoolName } from "@/lib/utils"
import { credentialAuthMatch, jp } from "@/lib/utils";
import MatchCountBadges from "../cards/MatchCountBadges"
import { useState } from "react"
import { Link } from "lucide-react"

export default function TeacherListList({ teachers, doHighlight }: { teachers: TeacherCardType[], doHighlight?: boolean }) {
    const [isComplete, setIsComplete] = useState(false)
    const [isFullError, setIsFullError] = useState(false)
    const [isFullWarning, setIsFullWarning] = useState(false)
    if (teachers.length === 0) {
        return (<div className="float text-center text-2xl text-muted">Loading...</div>)
    }

    function schoolName(sc: string) {
        return getSchoolName({ sc })
    }

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


    let cardBg = 'bg-card'
    if (doHighlight) {

        if (isComplete) {

            cardBg = 'bg-spotlight-highlight'
        } else
            if (isFullError) {

                cardBg = 'bg-destructive-highlight'
            } else
                if (isFullWarning) {

                    cardBg = 'bg-warning-highlight'
                }
    }



    return (


        <div className="no-scrollbar p-1 m-4 max-h-[50rem] max-w-[80rem] overflow-y-scroll flex flex-wrap justify-center border-2 rounded-lg">


            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">SEID</TableHead>
                        <TableHead className="w-[100px]">Last Name</TableHead>
                        <TableHead className="w-[100px]">First Name</TableHead>
                        <TableHead className="w-[100px]">Credential Count</TableHead>
                        <TableHead className="w-[100px]">Section Count</TableHead>
                        <TableHead className="w-[100px]">Complete</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher) => {
                        const counts = countMatches(teacher)
                        return (
                            <TableRow key={teacher.key_id} className="odd:text-secondary-foreground odd:bg-secondary hover:underline">
                                <TableCell>
                                    <a href={`/teacher/${teacher.seid}`} key={teacher.key_id}>
                                        {teacher.seid.toString()}
                                    </a>
                                </TableCell>
                                <a href={`/teacher/${teacher.seid}`} className="h-full w-full">
                                    <TableCell>
                                        {teacher.lastName}
                                    </TableCell>
                                </a>
                                <TableCell>
                                    <a href={`/teacher/${teacher.seid}`} >
                                        {teacher.firstName}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={`/teacher/${teacher.seid}`} >
                                        {teacher.credentials?.length}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={`/teacher/${teacher.seid}`} >
                                        {teacher.sections?.length}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <MatchCountBadges
                                        counts={counts}
                                        courseCount={teacher.sections?.length as number}
                                        setIsComplete={setIsComplete}
                                        setIsFullError={setIsFullError}
                                        setIsFullWarning={setIsFullWarning}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table>



        </div>

    )
}