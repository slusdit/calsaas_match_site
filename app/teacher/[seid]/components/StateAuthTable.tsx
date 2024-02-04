import {
    Table,
    TableCaption,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { TeacherCredential, StateCourseAuth } from "@prisma/client";

export default function StateAuthTable(
    {
        authCodes,
        credentials
    }: {
        authCodes?: StateCourseAuth[]
        credentials: TeacherCredential[]
    }) {
    return (

        <Table>
            <TableCaption>State Auth Codes</TableCaption>
            <TableHeader>
                <TableRow >
                    <TableHead className="w-[75px]">Doc Title</TableHead>
                    <TableHead className="w-[75px]">Auth Code</TableHead>
                    <TableHead className="w-[50px]">Auth Type</TableHead>
                    <TableHead className="w-[50px]">Subject Code</TableHead>
                    <TableHead className="w-[50px]">Subject</TableHead>
                    <TableHead className="w-[50px]">Notes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                {authCodes.map((authCode) => {
                    // Check if the authCode matches any credential
                    const isMatched = credentials.some(credential =>
                        credential.docTitle === authCode.docTitle &&
                        credential.authCode === authCode.authCode
                    );
                    const baseRowClassName = "odd:text-secondary-foreground odd:bg-secondary "
                    // 
                    const rowClassName = isMatched ? `bg-spotlight text-spotlight-foreground font-bold ` : baseRowClassName;

                    return (
                        <TableRow key={authCode.key_id} className={rowClassName}>
                            <TableCell>{authCode.docTitle}</TableCell>
                            <TableCell>{authCode.authCode}</TableCell>
                            <TableCell>{authCode.authType}</TableCell>
                            <TableCell>{authCode.subjectCode}</TableCell>
                            <TableCell>{authCode.subject}</TableCell>
                            <TableCell>{authCode.notes}</TableCell>

                        </TableRow>                      
                    )
                })}
            </TableBody>

        </Table>
    )
}