'use client'
import { School } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface Props {
    schools?: School[]
    updateSchool?: (school: string) => void
}

export default function SchoolSelector({ schools, updateSchool }: Props) {
    const [locations, setLocations] = useState<School[]>(schools || [])
    console.log(schools)

    useEffect(() => {
        if (!schools) { 
            const fetchSchools = async (): Promise<void> => {
                const response = await fetch('/api/schools', {'method': 'POST'})
                const data = await response.json()
                console.log(`SCHOOL DATA: ${data}`)
                setLocations(data)
            }
            fetchSchools()
        }
        if (schools){
            setLocations(schools)
        }
    }, [])

    const handleSchoolChange = (school: School) => {
        if (updateSchool) {
            updateSchool(school.sc)
        }
    }


    return (
        <div className="max-w-80 p-2">
            <Select >
                <SelectTrigger>
                    <SelectValue placeholder="School Filter" />
                </SelectTrigger>
                <SelectContent>
                    {locations.map((school, key) => (
                        <SelectItem value={school.sc} key={key}>{school.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
};
