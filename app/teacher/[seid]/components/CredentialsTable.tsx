'use client' 
import { CredentialForm } from "@/app/components/CredentialForm";
import FormDialog from "@/app/components/FormDialogue";
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
export default function CredentialsTable({ credentials, seid }: { credentials: credential[], seid?:string }) {
    console.log(seid)

    return (
        <>
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
                {credentials.map((credential, key) => (
                    <TableRow key={key}>
                        <TableCell>{credential.docTitle}</TableCell>
                        <TableCell>{credential.authCode}</TableCell>
                        <TableCell>{credential.subjectCodeMajor}</TableCell>
                        <TableCell>{credential.subjectCodeMinor}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
        <div className="flex">
        <div className="m-auto">
          <FormDialog triggerMessage="Add Credential" title="Add Teacher Credential">
            <CredentialForm seid={seid} submitTitle="Add Credential" />
          </FormDialog>
        </div>
      </div>
      </>
    )
   
}