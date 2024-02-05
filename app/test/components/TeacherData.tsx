'use client'
import { useState } from "react";
import { TeacherCardType } from "./TeacherCard";

export default function TeacherData({searchString}:{searchString?:string}){
    const [teachers, setTeachers] = useState()
    
    const fetchTeachers = async (): Promise<TeacherCardType[]> => {
            
        // const response = await fetch(`/api/teachers?search=${searchString}`, { method: 'GET',  });
        const response = await fetch(`http://localhost:3000/api/teachers`, { method: 'GET',  });
        const data: TeacherCardType[] = await response.json();
        return data;
    };
    const fetchData = async () => {
        const data = await fetchTeachers();
        setTeachers(data);
    };

    fetchData()
    return (
        <div className="flex justify-center">There are {teachers?.length ?? 0} teachers.</div>
    )
}