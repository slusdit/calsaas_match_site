'use client'
import { useSession } from "next-auth/react"
import ProfileImage from "../components/ProfileImage"



export default function SessionPage() {
    const { data: session } = useSession()
    console.log(session)
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
                    {/* <div>
                        Access to: Admin
                    </div> */}
                </div>
            </div>
                    </div>
        </div>
    )
}