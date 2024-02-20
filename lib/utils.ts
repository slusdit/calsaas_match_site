import { StateCourseAuth, TeacherCredential } from '@prisma/client';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// import prisma from './prisma';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function jp(data: JSON) {
  console.log(JSON.stringify(data, null, '\t'))
}

export function credentialAuthMatch({ 
  credentials, 
  stateCourseAuth 
}: { 
  credentials?: TeacherCredential[] | String
  stateCourseAuth?: StateCourseAuth[] | String
 }): 'noAuth' | 'noCredentials' | 'match' | 'noMatch' | 'error' {

  if(!stateCourseAuth || stateCourseAuth == '') {
    return 'noAuth'
  }
  if(!credentials || credentials == ''){
    return 'noCredentials'
  }
  const isMatch = credentials.some(credential => 
    stateCourseAuth.some(auth => 
        credential.docTitle === auth.docTitle &&
        credential.authCode === auth.authCode &&
        auth.authType === 'Full'
    )

    );
  if (isMatch) {
    return 'match'
  }

  if (!isMatch) {
    return 'noMatch'
  }
  return 'error'
 }

 export async function getSchoolName({sc}:{sc:string}) {

  const school = await prisma.school.findUnique({
    where: {
      sc: sc
        
      }    
  })
  if (!school) {
    return 'noSchool'
  }
  // console.log("hello")
  return school.name
}