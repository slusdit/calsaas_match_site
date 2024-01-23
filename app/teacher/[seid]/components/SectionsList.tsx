import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import StateAuthTable from "./StateAuthTable"
import {  Section, TeacherCredential } from "@prisma/client"

export default function SectionsList({ sections, credentials }: {sections:Section[], credentials:TeacherCredential[]}) {
    // console.log(sections)
    return (

        <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => {
                return ( 
               
            <AccordionItem value={section.sectionId}>
                    <AccordionTrigger>Course: <span className="font-bold">{section.courseName}</span> Section Number: <span className="font-bold">{section.sectionNumber}</span></AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-2 p-2">
                                <StateAuthTable
                                    authCodes={section.course.authTableId}
                                    credentials={credentials}
                                />
                            </div>
                        </AccordionContent>
            </AccordionItem>
            )}
)}
    </Accordion>
    )
}