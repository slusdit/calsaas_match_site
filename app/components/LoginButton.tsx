'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function LoginButton() {
    const { data: session } = useSession();
    if (session) {

    
    const imgUrl = session?.user?.image ? session.user.image : undefined
        
    
        
        return(
            <div className="">
                <Popover>
                    <PopoverTrigger>
                    <Avatar>
                        <AvatarImage src={imgUrl} />
                        <AvatarFallback></AvatarFallback>                  
                    </Avatar> 
                    </PopoverTrigger>
                    <PopoverContent className="grid justify-items-center w-80 mr-8">
                        <p>Welcome, {session?.user?.name}</p>
                        <div className="py-2">

                        <Link href="/profile">User Profile</Link>
                        </div>
                        <Button  
                            onClick={() => signOut()}
                            className="m-auto bg-red-400 hover:bg-red-500"
                            >
                            Sign out
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
    return(
        <div className="md:mr-8">
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => signIn()}>Sign in</Button>
        </div>
    )
}

