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

    return (
        <div className="w-content">

            <Accordion type="single" collapsible className="">
                <div className=""></div>
                {sections.map((section) => {
                    const matched = credentialAuthMatch({
                        credentials: credentials,
                        stateCourseAuth: section.course.authTableId
                    })
                    
                    const matchIcon = getMatchIcon(matched)
    
                    const matchedClassName = matched ? "bg-spotlight text-spotlight-foreground gap-24 px-1" : "gap-24 px-1"
                  
                    return (

                        <AccordionItem value={section.sectionId} className="gap-12 px-1 odd:bg-secondary odd:text-secondary-foreground" key={section.key_id}>
                            <AccordionTrigger className="gap-11 px-1">
                                Course:
                                <span className="font-bold">
                                    {section.courseName}
                                </span>
                                Section#:
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
                                <div className="mt-2 p-2">
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