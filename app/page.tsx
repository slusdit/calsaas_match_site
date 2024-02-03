"use client"
import Link from "next/link"
import TeacherSearch from "./components/TeacherSearch"
import { useSession } from "next-auth/react";

export default function TeacherSearchPage() {
  
  const session = useSession()
  return (
    <main>
      {session && session.status === "authenticated" ?
      <TeacherSearch className='m-auto flex'/>
      : <div className="m-auto flex">
        <Link href="/api/auth/signin">Please Sign In</Link>
      </div>
}
    </main>
  )
}