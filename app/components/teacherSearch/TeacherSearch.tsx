'use client'
import { Label } from "@/components/ui/label";
import TeacherListGrid from "./TeacherListGrid";
import { TeacherCardType } from "@/lib/types"
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


export default function TeacherSearch() {
    const [teachers, setTeachers] = useState<TeacherCardType[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null)
    const [doHighlight, setDoHighlight] = useState(true)

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
                    }
                })
                setTeachers(updatedTeachers)
            }
        };

        fetchData();
    }, [searchString, selectedSchool]);

    const tabsContent: TabContent[] = [
        {
            title: 'Grid',
            tabContent: <TeacherListGrid key="grid" teachers={teachers} doHighlight={doHighlight} />,
        },
        {
            title: 'List',
            tabContent: <TeacherListList key="list" teachers={teachers} doHighlight={doHighlight} />
        }
    ]

    return (
        <div className="flex flex-col">
            <div className="search-bar p-6 m-auto">
                <div className=" flex w-full items-center gap-10">
                    <div>

                        <Label htmlFor="searchOption">
                            Search for Teachers:
                        </Label>
                        <Input
                            id="searchOption"
                            type="text"
                            value={searchString}
                            onChange={handleInputChange}
                            placeholder="Last name / SEID"
                        />
                    </div>
                    <div>
                        <SchoolSelector onSchoolChange={setSelectedSchool} />
                    </div>
                </div>
                <div className="flex align-middle text-center">
                    <Switch
                        id="highlight-switch"
                        checked={doHighlight}
                        onCheckedChange={() => setDoHighlight(current => !current)}
                        aria-readonly
                    />
                    <div className="ml-4">
                    <Label htmlFor="highlight-switch">
                        Highlight
                    </Label>

                    </div>
                </div>

            </div>
            {session?.status === 'authenticated' && authorizedRoles.some(role => session?.data?.user?.role?.includes(role)) ?
                <div className="m-auto">

                    <TeacherTabs tabs={tabsContent} />
                </div>
                :
                <div className="float text-center">
                    <UnauthorizedButton role={{ authorizedRoles: authorizedRoles, adminRoles: adminRoles }} />
                </div>

            }
        </div>
    );
}
