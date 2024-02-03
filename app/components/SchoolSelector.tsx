'use client'
import { School } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

interface Props {
    schools?: School[]
    onSchoolChange?: (sc: string) => void
}

export default function SchoolSelector({ schools, onSchoolChange }: Props) {
    const [locations, setLocations] = useState<School[]>(schools || [])
   
    useEffect(() => {
        if (!schools) { 
            const fetchSchools = async (): Promise<void> => {
                const response = await fetch('/api/schools', {'method': 'POST'})
                const data = await response.json()
                setLocations(data)
            }
            fetchSchools()
        }
        if (schools){
            setLocations(schools)
        }
    }, [])

    const handleSchoolChange = (sc: string) => {
        if (onSchoolChange) {
            onSchoolChange(sc)
        }
    }


    return (
        <div className="max-w-80 p-2">
            <Label>School Filter</Label>
            <Select onValueChange={handleSchoolChange}>
                <SelectTrigger>
                    <SelectValue placeholder="School Filter" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='null' key={0}>All SLUSD</SelectItem>
                    {locations.map((school, key) => (
                        <SelectItem value={school.sc} key={key}>{school.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
};
