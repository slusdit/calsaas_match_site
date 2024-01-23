'use client'

import Link from "next/link";

// import { useRouter } from 'next/router';

export default function BackButton() {
  

  return (
    <Link href={'/'} className="bg-slate-300 hover:bg-sky-300 rounded-lg hover:text-slate p-2">
      Go Back
    </Link>
  );
}