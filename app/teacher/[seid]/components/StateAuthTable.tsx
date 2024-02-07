import { ScrollArea } from "@/components/ui/scroll-area";
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
        credentials,
    }: {
        authCodes?: StateCourseAuth[]
        credentials: TeacherCredential[]
    }) {
    return (
        <div className="w-min">

        <Table>
            <TableCaption>State Auth Codes</TableCaption>
            <ScrollArea className="h-96 border rounded">
            <TableHeader className="sticky top-0 bg-background border-b-4">
                <TableRow >
                    <TableHead className="w-1/12">Doc Title</TableHead>
                    <TableHead className="w-1/12">Auth Code</TableHead>
                    <TableHead className="w-1/12">Auth Type</TableHead>
                    <TableHead className="w-1/12">Subject Code</TableHead>
                    <TableHead className="w-1/12">Subject</TableHead>
                    <TableHead className="w-1/12">Notes</TableHead>
                </TableRow>
            </TableHeader>



                <TableBody className="">
                    {authCodes.map((authCode) => {
                        // Check if the authCode matches any credential
                        const isMatched = credentials.some(credential =>
                            credential.docTitle === authCode.docTitle &&
                            credential.authCode === authCode.authCode
                            );
                            const baseRowClassName = "odd:text-secondary-foreground odd:bg-secondary even:bg-background "
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
            </ScrollArea>
        </Table>
                    </div>
    )
}