'use client'
import { Label } from "@/components/ui/label";
import TeacherListGrid from "./TeacherListGrid";
import { ExpandRecursively, TeacherCardType } from "@/lib/types"
import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";
import SchoolSelector from "../SchoolSelector";
import { useSession } from "next-auth/react";
import { ROLE } from "prisma/prisma-client"
import Link from "next/link";
import TeacherTabs, { TabContent } from "./TeacherTabs";
import UnauthorizedButton from "../buttons/UnauthorizedButton";
import { credentialAuthMatch, jp } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import TeacherListList from "./TeacherListList";
import TeacherListDataTable from "./TeacherListDatatable";
import GlobalFilterControls from "./GlobalFilterControls";
import { School } from "lucide-react";

export const countMatches = (teacher: TeacherCardType) => {
    let matchCount = 0
    let noMatchCount = 0
    let errorCount = 0
    if (teacher.sections) {
        teacher.sections.forEach((section) => {
            const matched = credentialAuthMatch({
                credentials: teacher.credentials,
                stateCourseAuth: section.course.authTableId
            })


            if (matched === 'match') {
                matchCount++
            }
            if (matched === 'noAuth' || matched === 'noCredentials') {
                errorCount++
            }
            if (matched === 'noMatch') {
                noMatchCount++
            }
        });

        return {
            matchCount: matchCount,
            noMatchCount: noMatchCount,
            errorCount: errorCount
        };
    }
    return {
        matchCount: 0,
        noMatchCount: 0,
        errorCount: 99
    }
}

export default function TeacherSearch() {
    const [teachers, setTeachers] = useState<TeacherCardType[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null)
    const [doHighlight, setDoHighlight] = useState(true)
    const [completeSwitch, setCompleteSwitch] = useState(true)
    const [errorSwitch, setErrorSwitch] = useState(true)

    const authorizedRoles: ROLE[] = ["HR", "SUPERADMIN"]
    const adminRoles: ROLE[] = ["SUPERADMIN", "ADMIN"]

    const session = useSession()
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };


    useEffect(() => {
        const fetchTeachers = async (): Promise<TeacherCardType[]> => {

            const response = await fetch(`/api/teachers?search=${searchString}&school=${selectedSchool}`, { method: 'GET', });
            const data: TeacherCardType[] = await response.json();
            return data;
        };
        const fetchData = async () => {
            const data = await fetchTeachers();
            if (data) {
                const updatedTeachers = data.map((teacher) => {
                    const updatedSections = teacher.sections?.map((section) => {
                        const isMatch = credentialAuthMatch({ credentials: teacher.credentials, stateCourseAuth: section.course.authTableId })
                        return {
                            ...section,
                            match: isMatch
                        }
                    })

                    return {
                        ...teacher,
                        sections: updatedSections,
                        counts: countMatches(teacher)
                    }
                })
                console.log(updatedTeachers)
                setTeachers(updatedTeachers)
            }
        };

        fetchData();
    }, [searchString, selectedSchool]);

    const tabsContent: TabContent[] = [
        {
            title: 'Data Table',
            tabContent: <TeacherListDataTable
                key="datatable"
                teachers={teachers}
                doHighlight={doHighlight}
                completeSwitch={completeSwitch}
                errorSwitch={errorSwitch}
            />
        },
        {
            title: 'Grid',
            tabContent: <TeacherListGrid
                key="grid"
                teachers={teachers}
                doHighlight={doHighlight}
                completeSwitch={completeSwitch}
                errorSwitch={errorSwitch}
            />,
        },
        {
            title: 'List',
            tabContent: <TeacherListList
                key="list"
                teachers={teachers}
                doHighlight={doHighlight}
                completeSwitch={completeSwitch}
                errorSwitch={errorSwitch}
            />
        },
    ]

    return (
        <div className="flex flex-col">
            {/* <GlobalFilterControls
                searchString={searchString}
                handleInputChange={handleInputChange}
                doHighlight={doHighlight}
                setDoHighlight={setDoHighlight}
                setCompleteSwitch={setCompleteSwitch}
                setSelectedSchool={setSelectedSchool}
            /> */}
            <div>

                {session?.status === 'authenticated' && authorizedRoles.some(role => session?.data?.user?.role?.includes(role)) ?
                    <div className="m-auto">
                        <SchoolSelector

                            onSchoolChange={setSelectedSchool}
                        />
                         {/* <GlobalFilterControls
                searchString={searchString}
                handleInputChange={handleInputChange}
                doHighlight={doHighlight}
                setDoHighlight={setDoHighlight}
                setCompleteSwitch={setCompleteSwitch}
                setSelectedSchool={setSelectedSchool}
            /> */}
                        <TeacherTabs tabs={tabsContent} />
                    </div>
                    :
                    <div className="float text-center">
                        <UnauthorizedButton role={{ authorizedRoles: authorizedRoles, adminRoles: adminRoles }} />
                    </div>

                }
            </div>
        </div>
    );
}
