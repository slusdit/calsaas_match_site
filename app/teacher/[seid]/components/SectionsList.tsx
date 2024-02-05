'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import StateAuthTable from "./StateAuthTable"
import { Section, TeacherCredential, Course, StateCourseAuth } from "@prisma/client"
import { useState } from "react"
import { AlertTriangle, Check, CheckSquare, CheckSquare2, SquareIcon, XOctagon } from "lucide-react"
import { credentialAuthMatch } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { match } from "assert"

type StateAuthWithCourse = Course & {
    authTableId: StateCourseAuth
}

type SectionWithCourse = Section & {
    course: StateAuthWithCourse
}
export default function SectionsList({
    sections,
    credentials,
}: {
    sections: SectionWithCourse[],
    credentials: TeacherCredential[]
}) {


    return (
        <div className="w-content">

            <Accordion type="single" collapsible className="">
                <div className=""></div>
                {sections.map((section) => {
                    // const isMatched = credentials.some(credential =>
                    //     section.course.authTableId.some(auth =>
                    //         credential.docTitle === auth.docTitle &&
                    //         credential.authCode === auth.authCode
                    //     )
                    // );
                    const matched = credentialAuthMatch({
                        credentials: credentials,
                        stateCourseAuth: section.course.authTableId
                    })
                    const getMatchIcon = (matched?: string) => {
                        if (matched === 'match') {
                            return {
                                message: 'Credential and State Auth match!',
                                icon: <Check color="hsl(var(--spotlight))" />
                            }
                        } else if (matched === 'noMatch') {
                            return {
                                message: 'No Match',
                                icon: <AlertTriangle color="hsl(var(--warning))" />
                            }
                        } else if (matched === 'noCredentials' || matched === 'noAuth') {
                            return {
                                message: 'Warning: Missing Data',
                                icon: <XOctagon color="hsl(var(--destructive))" />
                            }
                        }
                        return {
                            message: 'Error!',
                            icon: <XOctagon color="hsl(var(--destructive))" />
                        }
                    };
                    const matchIcon = getMatchIcon(matched)
                    // const isMissing = section.course.authTableId?[0] ? true : undefined
                    const matchedClassName = matched ? "bg-spotlight text-spotlight-foreground font-bold gap-24 px-1" : "gap-24 px-1"

                    return (

                        <AccordionItem value={section.sectionId} className="gap-24 px-1" key={section.key_id}>
                            <AccordionTrigger className="gap-10 px-1">
                                Course:
                                <span className="font-bold">
                                    {section.courseName}
                                </span>
                                Section Number:
                                <span className="font-bold">
                                    {section.sectionNumber}
                                </span>
                                Match:
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="font-bold">
                                            {matchIcon.icon}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                                {matchIcon.message}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </AccordionTrigger>
                            <AccordionContent className="">
                                <div className="mt-2 p-2 w-cpmtemt">
                                    <div className="m-auto mb-2">
                                        State Course Code: <span className="font-bold">{section.stateCode}</span>
                                    </div>
                                    <StateAuthTable
                                        authCodes={section.course.authTableId || []}
                                        credentials={credentials}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                }
                )}
            </Accordion>
        </div>
    )
}