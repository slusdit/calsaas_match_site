import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Section, Teacher, TeacherCredential } from "@prisma/client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"

export type TeacherCardType = Teacher & {
    sections: Section[]
    credentials: TeacherCredential[]
}

interface Props {
    teacher: TeacherCardType
}

export default function TeacherCard({ teacher }: Props) {
    return (
        <Link href={`/teacher/${teacher.seid}`} className="h-full" >
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
            hover:scale-105 
            transition-transform 
            duration-300">
                <CardHeader className="">
                    <CardTitle className="h-12 inline-block align-middle overflow-hidden">{teacher.lastName}, {teacher.firstName}</CardTitle>
                    <CardDescription>SEID: {teacher.seid}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center align-bottom ">
                        <div className="p-2">
                            Section Count: <br />
                            {teacher.sections.length}
                        </div>
                        <Separator orientation="vertical" />
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
            </Card>
        </Link>
    )
}
