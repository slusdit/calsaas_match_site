import Link from "next/link";
import { TeacherCardType } from "../page";

interface Props {
    teacher: TeacherCardType
}

export default function TeacherCard({ teacher }: Props) {
    return (
        <div className="w-64 h-48 m-3 p-3 rounded overflow-hidden border-4 cursor-pointer" key={teacher.seid}>
            <Link href={`/teacher/${teacher.seid}`}>
                <div className="m-3 text-center">
                    {/* TODO: Add when School table is setup 
                    {teacher.sc} */}
                    <span className="font-semibold">
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