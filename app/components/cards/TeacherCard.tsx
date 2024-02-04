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

interface Props {
    teacher: TeacherCardType
    
}

export default function TeacherCard({ teacher }: Props) {

    function isMatch(authCodes:StateCourseAuth[], credentials:TeacherCredential[]){
        
    }
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
                        <CardDescription>SEID: {teacher.seid}</CardDescription>
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
