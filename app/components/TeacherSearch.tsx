'use client'
import { Label } from "@/components/ui/label";
import TeacherListGrid, { TeacherCardType } from "./TeacherListGrid";
import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";

export default function TeacherSearch() {
    const [teachers, setTeachers] = useState<TeacherCardType[]>([]);
    const [searchString, setSearchString] = useState<string>('');

    const fetchTeachers = async (): Promise<TeacherCardType[]> => {

        const response = await fetch(`/api/teachers?search=${searchString}`, { method: 'POST' });
        const data: TeacherCardType[] = await response.json();
        return data;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTeachers();
            setTeachers(data);
        };
        fetchData();
    }, [searchString]); // Depend on searchString

    return (
        <>
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
            </div>
            <TeacherListGrid teachers={teachers} />
        </>
    );
}
