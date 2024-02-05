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

interface Props {
    teacher: TeacherCardType

}

export default function TeacherCard({ teacher }: Props) {

    const countMatches = (data) => {
        let matchCount = 0
        let noMatchCount = 0
        let errorCount = 0

        data.sections.forEach((section) => {
            const matched = credentialAuthMatch({
                credentials: teacher.credentials,
                stateCourseAuth: section.course.authTableId
            })
           
            if (matched === 'match') {
                matchCount ++
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

    const counts = countMatches(teacher)

    return (
        <Link href={`/teacher/${teacher.seid}`} className={`h-full`} >
            <Card className="w-72 
            min-h-56 
            m-2 
            text-center 
            bg-card 
            text-card-foreground 
            rounded-xl 
            overflow-hidden 
            border-2 
            cursor-pointer
            hover:shadow-sm
            hover:shadow-primary 
           ">
                {/* Hover Effect Container */}
                <div className=" 
                hover:scale-105
                transition-transform 
                duration-300
                ">
                    <CardHeader className="">
                        <CardTitle className="h-12 inline-block align-middle overflow-hidden">{teacher.lastName}, {teacher.firstName}</CardTitle>
                        <CardDescription>
                            SEID: {teacher.seid}

                            {/* <MatchCountBadges counts={counts} courseCount={teacher.sections.length} /> */}
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center align-bottom ">
                            <div className="p-2">
                                Section Count: <br />
                                {teacher.sections?.length}
                            </div>
                            <div className="w-0.5 bg-border"></div>
                            {teacher.credentials ? (
                                <div className="p-2">
                                    Credential Count: <br />
                                    {teacher.credentials.length}
                                </div>
                            ) : (
                                <div className="p-2 ">
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
