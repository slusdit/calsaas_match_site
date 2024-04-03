import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TeacherCardType } from '@/lib/types'
import { getSchoolName } from "@/lib/utils"
import { credentialAuthMatch, jp } from "@/lib/utils";
import MatchCountBadges from "../cards/MatchCountBadges"
import { useEffect, useState } from "react"
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

    const TeacherRow = ({
        teacher,
        doHighlight,
        setIsComplete,
        setIsFullError,
        setIsFullWarning
    }: {
        teacher: TeacherCardType
        doHighlight?: boolean
        setIsComplete: (isComplete: boolean) => void
        setIsFullError: (isFullError: boolean) => void
        setIsFullWarning: (isFullWarning: boolean) => void
    }) => {
        const [rowStyle, setRowStyle] = useState('odd:text-secondary-foreground odd:bg-secondary hover:underline');

        const counts = countMatches(teacher);

        useEffect(() => {
            if (doHighlight) {
                let style = 'odd:text-secondary-foreground odd:bg-secondary hover:underline ';
                if (counts.errorCount > 0 && counts.noMatchCount == 0 && counts.matchCount == 0) {
                    style = 'bg-destructive-highlight text-destructive-highlight-foreground  hover:underline';
                } else if (counts.matchCount === teacher.sections?.length) {
                    style = 'bg-spotlight-highlight text-spotlight-highlight-foreground hover:underline';
                } else if (counts.noMatchCount > 0 && counts.errorCount == 0 && counts.matchCount == 0) {
                    style = 'bg-warning-highlight text-warning-highlight-foreground hover:underline';
                }
                setRowStyle(style);
            }
        }, [doHighlight, counts, teacher.sections?.length]);

        return (
            <TableRow key={teacher.key_id} className={rowStyle}>
                <TableCell className="text-center">
                    <a href={`/teacher/${teacher.seid}`} key={teacher.key_id}>
                        {teacher.seid.toString()}
                    </a>
                </TableCell>
                <a href={`/teacher/${teacher.seid}`} className="h-full w-full">
                    <TableCell className="text-center capitalize" >
                        {teacher.lastName}
                    </TableCell>
                </a>
                <TableCell className="text-center">
                    <a href={`/teacher/${teacher.seid}`} >
                        {teacher.firstName}
                    </a>
                </TableCell>
                <TableCell className="text-center" >
                {teacher.credentials && teacher.credentials.length !== 0 ? 
                    <a href={`/teacher/${teacher.seid}`}  >
                        {teacher.credentials?.length}
                    </a>
                    :
                    <a href={`/teacher/${teacher.seid}`} className='py-2 px-4 bg-destructive text-destructive-foreground rounded-2xl'  >
                        {teacher.credentials?.length}
                    </a>
    }
                </TableCell>
                <TableCell className="text-center">
                    <a href={`/teacher/${teacher.seid}`} >
                        {teacher.sections?.length}
                    </a>
                </TableCell>
                <TableCell className="text-center">
                    <MatchCountBadges
                        counts={counts}
                        courseCount={teacher.sections?.length as number}
                        setIsComplete={setIsComplete}
                        setIsFullError={setIsFullError}
                        setIsFullWarning={setIsFullWarning}
                    />
                </TableCell>
            </TableRow>
        );
    };

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


    let rowStyle = 'odd:text-secondary-foreground odd:bg-secondary hover:underline'
    if (doHighlight) {

        if (isComplete) {

            rowStyle = 'bg-spotlight-highlight text-spotlight-foreground hover:underline'
        } else
            if (isFullError) {

                rowStyle = 'bg-destructive-highlight text-destructive-foreground hover:underline'
            } else
                if (isFullWarning) {

                    rowStyle = 'bg-warning-highlight tex-warning-foreground hover:underline'
                }
    }
    return (

        <div className="no-scrollbar m-4 max-h-[55rem] w-screen-2xl overflow-y-scroll flex flex-wrap justify-center border-2 rounded-lg">

            <Table className="w-screen-2xl">
                <TableHeader className="w-screen-2xl sticky top-0 z-10 ">
                    <TableRow >
                        <TableHead className="w-[120px] text-center">SEID</TableHead>
                        <TableHead className="w-[100px] text-center">Last Name</TableHead>
                        <TableHead className="w-[100px] text-center">First Name</TableHead>
                        <TableHead className="w-[100px] text-center">Credential Count</TableHead>
                        <TableHead className="w-[100px] text-center">Section Count</TableHead>
                        <TableHead className="w-[100px] text-center">Complete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers.map((teacher) => (
                        <TeacherRow
                            key={teacher.key_id}
                            teacher={teacher}
                            doHighlight={doHighlight} />
                    ))}
                </TableBody>
            </Table>

        </div>

    )
}