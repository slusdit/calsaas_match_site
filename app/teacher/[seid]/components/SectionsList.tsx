import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import StateAuthTable from "./StateAuthTable"
import {  Section, TeacherCredential, Course, StateCourseAuth } from "@prisma/client"

type StateAuthWithCourse = Course & {
    authTableId: StateCourseAuth 
}

type SectionWithCourse = Section & {
    course: StateAuthWithCourse 
}
export default function SectionsList({ sections, credentials }: {sections:SectionWithCourse[], credentials:TeacherCredential[]}) {
    // console.log(sections)
    
    return (

        <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => {
                const isMatched = credentials.some(credential =>
                    credential.docTitle === section.course.authTableId.docTitle &&
                    credential.authCode === section.course.authTableId.authCode
                );

                const matchedClassName = isMatched ? "bg-green-500" : ""
                
                return ( 
               
            <AccordionItem value={section.sectionId} className={matchedClassName}>
                    <AccordionTrigger className={matchedClassName}>Course: <span className="font-bold">{section.courseName}</span> Section Number: <span className="font-bold">{section.sectionNumber}</span></AccordionTrigger>
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