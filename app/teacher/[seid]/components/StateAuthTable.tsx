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
        authCodes: StateCourseAuth[]
        credentials: TeacherCredential[] 
        }) {
    return (

        <Table>
            <TableCaption>State Auth Codes</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Document Title</TableHead>
                    <TableHead className="w-[150px]">Auth Code</TableHead>
                    <TableHead className="w-[100px]">Subject code</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
            {authCodes.map((authCode) => {
                    // Check if the authCode matches any credential
                    const isMatched = credentials.some(credential =>
                        credential.docTitle === authCode.docTitle &&
                        credential.authCode === authCode.authCode
                    );

                    // Assign a different className if matched
                    const rowClassName = isMatched ? "bg-lime-500" : "";

                    return (
                        <TableRow key={authCode.key_id} className={rowClassName}>
                            <TableCell className={rowClassName}>{authCode.docTitle}</TableCell>
                            <TableCell>{authCode.authCode}</TableCell>
                            <TableCell>{authCode.subjectCode}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>

        </Table>
                )
    }