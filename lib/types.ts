import { Teacher, Section, TeacherCredential } from "prisma/prisma-client"

export type TeacherCardType = Teacher & {
    sections?: Section[]
    credentials?: TeacherCredential[]
  }


// 
//   Helpful dev utility types
// 

// expands object types one level deep
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// expands object types recursively
export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T;