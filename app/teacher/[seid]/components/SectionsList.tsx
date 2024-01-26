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
        <div className="w-96">

        <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => {
                const isMatched = credentials.some(credential =>
                    credential.docTitle === section.course.authTableId.docTitle &&
                    credential.authCode === section.course.authTableId.authCode
                    );
                    
                    const matchedClassName = isMatched ? "bg-green-500 Matched" : ""

                    return ( 
                        
            <AccordionItem value={section.sectionId} className={matchedClassName} key={section.key_id}>
                    <AccordionTrigger className={matchedClassName}>Course: <span className="font-bold">{section.courseName}</span> Section Number: <span className="font-bold">{section.sectionNumber}</span></AccordionTrigger>
                        <AccordionContent>
                                <div className="mt-2 p-2 w-auto">
                                    <div className="m-auto">
                                        State Course Code: <span className="font-bold">{section.stateCode}</span>
                                    </div>    
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
    </div>
    )
}