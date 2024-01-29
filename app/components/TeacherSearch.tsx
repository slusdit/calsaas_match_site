'use client'
import { Label } from "@/components/ui/label";
import TeacherListGrid, { TeacherCardType } from "./TeacherListGrid";
import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";
import  SchoolSelector from "./SchoolSelector";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function TeacherSearch() {
    const [teachers, setTeachers] = useState<TeacherCardType[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

    const session = useSession()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };


     useEffect(() => {
        const fetchTeachers = async (): Promise<TeacherCardType[]> => {
            
            const response = await fetch(`/api/teachers?search=${searchString}&school=${selectedSchool}`, { method: 'GET' });
            const data: TeacherCardType[] = await response.json();
            return data;
        };
        const fetchData = async () => {
            const data = await fetchTeachers();
            setTeachers(data);
        };

        fetchData();
    }, [searchString, selectedSchool]); 
    
    return (
        <div className="">
            <div className="search-bar p-6 m-auto">
                <div className="grid w-full max-w-sm items-center gap-1.5">
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
                    <SchoolSelector onSchoolChange={setSelectedSchool}/>
                </div>
                
            </div>
            { session.status === 'unauthenticated' ? 
            <div className="float text-center">
                <Link
                    className='text-underline' 
                    href={'/api/auth/signin'}>
                       Please Sign In
                </Link>
            </div>
            :
            <TeacherListGrid teachers={teachers} />
        }
        </div>
    );
}
