import { Section, Teacher, TeacherCredential } from "@prisma/client";
import Link from "next/link";

export interface TeacherCardType extends Teacher{
    sections: Section[]
    credentials: TeacherCredential[]
  }

interface Props {
    teacher: TeacherCardType
}

export default function TeacherCard2({ teacher }: {teacher:TeacherCardType}) {
    teacher.sections.forEach((section) => {
        // {console.log(`Section Course: ${JSON.stringify(section)}`)}
        const isMatched = teacher.credentials.some(credential =>
            credential.docTitle === section.course?.authTableId.docTitle &&
            credential.authCode === section.course.authTableId.authCode
            )
        // console.log(isMatched)
        });
    return (
        <div className="w-64 m-3  bg-card hover:bg-card-foreground rounded-lg overflow-hidden border-2 cursor-pointer hover:scale-105 transition-transform duration-300" key={teacher.seid}>
            <Link href={`/teacher/${teacher.seid}`} className="h-full">
                <div className="p-2 text-center">
                    {/* TODO: Add when School table is setup 
                    {teacher.sc} */}
                    <span className="font-semibold ">
                        {teacher.firstName} {teacher.lastName}
                    </span>
                    <div className="mt-2">
                        SEID: {teacher.seid}
                    </div>
                    <div className="m-3 flex justify-center">
                        <div className="border rounded p-2 ">
                            Section Count: <br />
                            {teacher.sections.length}
                        </div>
                        {teacher.credentials ? (
                        <div className="border rounded p-2 ">
                            Credential Count: <br />
                            {teacher.credentials.length}
                        </div>
                        ) : (
                            <div className="border rounded p-2 ">
                            Credential Count: <br />
                            0
                        </div>
                        )}
                    </div>
                </div>
                
            </Link>
        </div>
    )
}