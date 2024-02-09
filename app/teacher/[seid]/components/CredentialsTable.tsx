'use client'
import { CredentialForm } from "@/app/components/forms/CredentialForm";
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
import { Asterisk, Plus, Save } from "lucide-react";
import { TeacherCredential } from "@prisma/client";
import FormDialog from "@/app/components/forms/FormDialog";

export default function CredentialsTable({ credentials, seid }: { credentials: TeacherCredential[], seid?: string }) {
        const manuallyAdded = ({ credential }: { credential: TeacherCredential }) => {
        if (credential.credPersonId === null) {
            const creatorString = `Manually entered by ${credential.created_by.split('@')[0]} on ${credential.created_at.toLocaleDateString()}`
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Asterisk className="w-4" color='hsl(var(--destructive))' />
                        </TooltipTrigger>
                        <TooltipContent>
                            {creatorString}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }
        return ''
    }
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-0.5"></TableHead>
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
                            <TableCell>{manuallyAdded({credential})}</TableCell>
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
                    <FormDialog triggerMessage="Add Credential" icon={<Plus className="py-1" />} title="Add Teacher Credential">
                        <CredentialForm seid={seid} submitTitle="Save Credential" icon={<Save />} />
                    </FormDialog>
                </div>
            </div>
        </>
    )

}