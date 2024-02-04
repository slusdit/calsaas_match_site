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
import { Check, CheckSquare, CheckSquare2, SquareIcon } from "lucide-react"

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
    // console.log(sections)

    return (
        <div className="w-content">

            <Accordion type="single" collapsible className="">
                <div className=""></div>
                {sections.map((section) => {
                    const isMatched = credentials.some(credential => 
                        section.course.authTableId.some(auth => 
                            credential.docTitle === auth.docTitle &&
                            credential.authCode === auth.authCode
                        )
                    );
                    // const isMissing = section.course.authTableId?[0] ? true : undefined
                                     
                    const matchedClassName = isMatched ? "bg-spotlight text-spotlight-foreground font-bold gap-24 px-1" : "gap-24 px-1"

                    return (

                         <AccordionItem value={section.sectionId} className="gap-24 px-1" key={section.key_id}>
                            <AccordionTrigger className="gap-24 px-1">
                                Course:
                                <span className="font-bold">
                                    {section.courseName}
                                </span>
                                Section Number:
                                <span className="font-bold">
                                    {section.sectionNumber}
                                </span>
                                Match: 
                                <span className="font-bold">
                                    {isMatched ? <Check color="hsl(var(--spotlight))"/> : <SquareIcon />}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="">
                                <div className="mt-2 p-2 w-">
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