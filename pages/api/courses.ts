import { PrismaClient, Teacher, Section, TeacherCredential, School, Course } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const courses: Course[] = await prisma.course.findMany({
        where:{
            sectionTableId: {
                some: {}
            }

        }
      });
      res.status(200).json(courses);
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