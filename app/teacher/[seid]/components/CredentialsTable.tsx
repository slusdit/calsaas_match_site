 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
interface credential {
    key_id: number;
    credPersonId: string;
    caltidesNumId: string | null;
    docTitle: string;
    authCode: string;
    subjectCodeMajor: string | null;
    subjectCodeMinor: string | null;
    created_at: Date;
    updated_at: Date;
}
export default function CredentialsTable({ credentials }: { credentials: credential[] }) {
    // console.log(credentials)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Document Title</TableHead>
                    <TableHead className="w-[150px]">Auth Code</TableHead>
                    <TableHead className="w-[100px]">Mojor</TableHead>
                    <TableHead className="w-[100px]">Minor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {credentials.map((credential) => (
                    <TableRow>
                        <TableCell>{credential.docTitle}</TableCell>
                        <TableCell>{credential.authCode}</TableCell>
                        <TableCell>{credential.subjectCodeMajor}</TableCell>
                        <TableCell>{credential.subjectCodeMinor}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    )
   
}