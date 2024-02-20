"use client"
import Link from "next/link"
import TeacherSearch from "./components/teacherSearch/TeacherSearch"
import { useSession } from "next-auth/react";
import { Suspense } from "react";

export default function TeacherSearchPage() {
  
  const session = useSession()
  return (
    <main>
      {session && session.status === "authenticated" ?
      <Suspense fallback={<div>Loading...</div>}>

        <TeacherSearch />
      </Suspense>
      : <div className="m-auto flex">
        <Link href="/api/auth/signin">Please Sign In</Link>
      </div>
}
    </main>
  )
}