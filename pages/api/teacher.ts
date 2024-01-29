import { PrismaClient, Teacher, Section, TeacherCredential } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { notFound } from 'next/navigation';
import { TeacherCreate}

export interface TeacherCardType extends Teacher {
  sections: Section[];
  credentials: TeacherCredential[];
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'POST') {
        const firstName = req.query.firstName
        const lastName = req.query.lastName


        const teacher = await prisma.teacher.create({
            data:{
                firstName: firstName,
                
            }
        })
    }
  
    if (req.method === 'GET') {
    try {
      const seid = req.query.seid as string;
    
      const teacher = await prisma.teacher.findUnique({
        where: {
            seid 
        }, 
        include: {
            sections: {
                include: {
                    course: {
                        include: {
                            authTableId: true
                        }
                    }
                }
            }, 
            credentials: true
        }
      })

      if (!teacher) {
        notFound();
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}


export const config = {
  // api: {
  //   responseLimit: false,
  // }
}
// export { handler as POST}