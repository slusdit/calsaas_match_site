import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TeacherCard from "../cards/TeacherCard"
import { TeacherCardType } from '@/lib/types'
import TestLogButton from "../buttons/TestLogButton"
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

    const linkCell = (link: string, content: string, key: string) => {
        return (<Link
            href={link}
            key={key}
            className={`h-full`}
        >
            {content}
        </Link>
        )
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
                            <TableRow key={teacher.key_id} className="odd:text-secondary-foreground odd:bg-secondary ">
                                <TableCell>

                                    {linkCell(`teacher/${teacher.seid}`, teacher.seid, teacher.key_id.toString())}

                                </TableCell>
                                <TableCell>{teacher.lastName}</TableCell>
                                <TableCell>{teacher.firstName}</TableCell>
                                <TableCell>{teacher.credentials?.length}</TableCell>
                                <TableCell>{teacher.sections?.length}</TableCell>
                                <TableCell><MatchCountBadges
                                    counts={counts}
                                    courseCount={teacher.sections?.length}
                                    setIsComplete={setIsComplete}
                                    setIsFullError={setIsFullError}
                                    setIsFullWarning={setIsFullWarning}
                                /></TableCell>

                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table>



        </div>

    )
}