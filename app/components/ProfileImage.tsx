'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'


export default function ProfileImage() {
    const {data:session} = useSession()
    
    if(session) {
        return (
            <Avatar>
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback></AvatarFallback>                  
            </Avatar> 
        )
    }
    return <></>

}
