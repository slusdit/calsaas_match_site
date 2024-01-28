'use client'
import { School } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface Props {
    schools?: School[]
    updateSchool?: any
}

export default function SchoolSelector({ schools }: Props) {
    const [locations, setLocations] = useState<School[]>([])

    if (!schools){
    async ():Promise<School[]> => {
        const response = await fetch('/api/schools', {'method': 'POST'})
        const data = await response.json()
        console.log(`SCHOOL DATA: ${data}`)
        setLocations(data)
        return data
    }          
    }

    if (!schools) {
        schools = [{
            "sc": '2',
            "name": 'Test School'
        }]
    }

    return (
        <div>
            <Select value='' >
                <SelectTrigger className="w-[180px]">
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
