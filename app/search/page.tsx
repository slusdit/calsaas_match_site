'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { PrismaClient, Teacher, Section, Prisma } from "@prisma/client";
import Link from "next/link";
import TeacherCard from "@/app/components/TeacherCard";

export interface TeacherCardType extends Teacher {
  sections: Section[];
  credentials: Credential[];
}

const prisma = new PrismaClient();

const fetchTeachers = async (searchInput?: string): Promise<Teacher[]> => {
  const queryOptions: Prisma.TeacherFindManyArgs = {
    orderBy: {
      lastName: 'asc',
    },
    include: {
      sections: true,
      credentials: true,
    },
  };

  if (searchInput) {
    queryOptions.where = {
      OR: [
        { seid: searchInput },
        { lastName: { contains: searchInput, mode: 'insensitive' } },
      ],
    };
  }

  const teachers = await prisma.teacher.findMany(queryOptions);
  return teachers;
};

export default function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchTeachers(searchInput).then(setTeachers);
  }, [searchInput]);

  const memorizedTeachers = useMemo(() => teachers, [teachers]);

  return (
    <main>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by SEID or Last Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="py-3 px-2/8 flex flex-wrap justify-center">
        {memorizedTeachers.map((teacher) => {
          if (teacher.sections.length > 0) {
            return <TeacherCard key={teacher.id} teacher={teacher} />;
          }
          return null;
        })}
      </div>
    </main>
  );
}
