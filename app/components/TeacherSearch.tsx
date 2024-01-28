'use client'
import { Label } from "@/components/ui/label";
import TeacherListGrid, { TeacherCardType } from "./TeacherListGrid";
import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";
import  SchoolSelector from "./SchoolSelector";
import { School } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function TeacherSearch() {
    const [teachers, setTeachers] = useState<TeacherCardType[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [locations, setLocations] = useState<School[]>([])

    const session = useSession()



    const handleSchoolChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    useEffect(() => {
        const fetchLocations = async ():Promise<School[]> => {
            const response = await fetch(`/api/schools`, {method: 'POST'});
            const data = await response.json()
            return data
        }

        const setSchools = async () => {
            const data = await fetchLocations();
            setLocations(data)
        }

        setSchools();
    },[])

     useEffect(() => {
        const fetchTeachers = async (): Promise<TeacherCardType[]> => {

            const response = await fetch(`/api/teachers?search=${searchString}`, { method: 'POST' });
            const data: TeacherCardType[] = await response.json();
            return data;
        };
        const fetchData = async () => {
            const data = await fetchTeachers();
            setTeachers(data);
        };
        fetchData();
    }, [searchString]); // Depend on searchString
    console.log(locations)
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
                    <SchoolSelector schools={locations}/>
                </div>
                
            </div>
            { session.status === 'unauthenticated' ? 
            <div className="float text-center">Please sign in</div>
            :
            <TeacherListGrid teachers={teachers} />
        }
        </div>
    );
}
