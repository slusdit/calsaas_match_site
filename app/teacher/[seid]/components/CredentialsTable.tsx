'use client'
import { CredentialForm } from "@/app/components/forms/CredentialForm";
import FormDialog from "@/app/components/forms/FormDialogue";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipProvider,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";

interface credential {
    key_id: number;
    credPersonId: string;
    caltidesNumId: string | null;
    docTitle: string;
    authCode: string;
    authType: string;
    authTitle: string;
    subjectCodeMajor: string | null;
    subjectCodeMinor: string | null;
    created_at: Date;
    updated_at: Date;
}
export default function CredentialsTable({ credentials, seid }: { credentials: credential[], seid?: string }) {
    const triggerMessage = "Add Credential"

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Document Title</TableHead>
                        <TableHead className="w-[100px]">Auth Code</TableHead>
                        <TableHead className="w-[100px]">Auth Type</TableHead>
                        <TableHead className="w-[100px]">Major</TableHead>
                        <TableHead className="w-[100px]">Minor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {credentials.map((credential, key) => (
                        <TableRow key={key} className="odd:text-secondary-foreground odd:bg-secondary">
                            <TableCell>{credential.docTitle}</TableCell>
                            <TableCell>{credential.authCode}</TableCell>
                            <TableCell>{credential.authType}</TableCell>
                            <TableCell>{credential.subjectCodeMajor}</TableCell>
                            <TableCell>{credential.subjectCodeMinor}</TableCell>

                        </TableRow>

                    ))}
                </TableBody>

            </Table>
            <div className="flex">
                <div className="m-auto mt-2">
                    <FormDialog triggerMessage={triggerMessage} icon={<Plus className="py-1" />} title="Add Teacher Credential">
                        <CredentialForm seid={seid} submitTitle="Submit Credential" />
                    </FormDialog>
                </div>
            </div>
        </>
    )

}