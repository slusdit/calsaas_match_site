'use client'
import { useSession } from "next-auth/react"
import ProfileImage from "../components/ProfileImage"
import { Badge } from "@/components/ui/badge"
import SuperAdminPanel from "../components/SuperAdminPanel";

interface User {
    name: string;
    email: string;
    image: string;
    role: string[];
   }
   
   interface Session {
    data?: User;
    status?: string;

   }


export default function SessionPage() {
    const { data: session } = useSession<Session>()
    const other = useSession()
    console.log(other)
    return (
        <div className="flex flex-col">
            <div className="m-auto">

                <div>User Page</div>
                <br />
                <div >
                    <div className="pt-3 items-center">
                        <ProfileImage />
                        <p>
                            Name: {session?.user?.name}
                        </p>
                        <p>
                            Email: {session?.user?.email}
                        </p>
                        <div>
                            {session && session.user && session?.user?.role &&
                                <div className="flex mr-1">
                                    Roles: {session?.user.role.map((badge: string, key: int) => {
                                        return <Badge key={key} className="mx-1">{badge.toString().toLowerCase()}</Badge>
                                    }
                                    )}

                                </div>
                            }
                        </div>
                        {session?.user?.role.includes("SUPERADMIN") && 
                        <SuperAdminPanel />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}