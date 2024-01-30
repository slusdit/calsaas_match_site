"use client"
import Link from "next/link"
import TeacherSearch from "./components/TeacherSearch"
import { useSession } from "next-auth/react";

export default function TeacherSearchPage() {
  
  const session = useSession()
  console.log(session)
  return (
    <main>
      {session && session.status === "authenticated" ?
      <TeacherSearch />
      : <div className="m-auto">
        <Link href="/api/auth/signin">Please Sign In</Link>
      </div>
}
    </main>
  )
}