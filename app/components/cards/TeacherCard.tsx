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

interface Props {
    teacher: TeacherCardType

}

export default function TeacherCard({ teacher }: Props) {
    jp(teacher)
    // const countMatch = (tch) => {
    //     const match = tch.course.authTableId.match

    // }
    // countMatch(teacher)
    const countMatchesNull = (data) => {
        // Initialize a count variable
        let count = 0;

        // Loop through each section
        data.sections.forEach((section) => {
            const matched = credentialAuthMatch({
                credentials: teacher.credentials,
                stateCourseAuth: section.course.authTableId
            })
            console.log(matched)
            if (matched === 'match') {
                count ++
            }
            // Loop through each authTableId in the current section
            // section.course.authTableId.forEach((auth) => {
            //     // Check if match is null and increment count if true
            //     if (auth.match != null) {
            //         count++;
            //     }
            // });
        });

        return count;
    }

    const nullCount = countMatchesNull(teacher)

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
                            <Badge >
                                {nullCount}
                            </Badge>
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
