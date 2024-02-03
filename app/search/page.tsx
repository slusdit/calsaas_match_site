'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { PrismaClient, Teacher, Section, Prisma } from "@prisma/client";
import Link from "next/link";
import TeacherCard from "@/app/components/TeacherCard3";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface TeacherCardType extends Teacher{
  sections: Section[]
  credentials: Credential[]
}

export default function TeacherList() {
  // const teachers = await fetchTeachers()
  const [teachers, setTeachers] = useState<TeacherCardType[]>([])
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchTeachers() {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      // console.log(data)
      setTeachers(data)
    }
  },[searchInput])
 

  return (
    <main>
      <div className="search-bar pt-2 m-auto">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="searchOption">Search by SEID: </Label>
      <Input id="searchOption" type="text" placeholder="NOT WORKING" />
    </div>
        </div>
      <div className="py-3 px-2/8 flex flex-wrap justify-center">
        {teachers.map((teacher) => {
           if (teacher.sections.length > 0) {
              return <TeacherCard teacher={teacher} />
            }
            })}
      </div>
    </main>
  )
}