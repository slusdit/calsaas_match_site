import { PrismaClient, Teacher, Section, TeacherCredential } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface TeacherCardType extends Teacher {
  sections?: Section[];
  credentials?: TeacherCredential[];
}

// type SectionWithAuth = {
//   sections: string[]
// }

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    
    const search = req.query.search ?? '' as string;
    const school = req.query.school ?? '' as string;

    try {
    
      const teachers: TeacherCardType[] = await prisma.teacher.findMany({
        take: 100,
        where: {
          OR: [
            {
              caltidesNumId: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              firstName: {
                contains: search,
                mode: 'insensitive', 
              },
            },
            {
              empId: {
                contains: search,
                mode: 'insensitive', 
              },
            },
          ],
          sections: {
            some: school && school !== 'null' ? {
              sc: {
                equals: school,
              }, 
            } : {},
          },
        },
        orderBy: {
          lastName: 'asc',
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
        },
      });
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error Try failed' });
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